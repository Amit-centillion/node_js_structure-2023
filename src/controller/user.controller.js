const user = require("../model/user");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { ENV_CCONST } = require("../constants/envVariable");
const { MESSAGE } = require("../constants/message");
const { USER } = MESSAGE;
const { sendMail } = require("../utils/sendMail");
const { otpGenerator } = require("../utils/otpGenreate");
const registration = async (req, res) => {
  try {
    const data = { ...req.body };
    const findUser = await user.findOne({ firstName: data.firstName });
    data.password = bcrypt.hashSync(
      data.password,
      bcrypt.genSaltSync(ENV_CCONST.secreate.salt)
    );
    if (findUser != null) {
      return res.status(400).json({
        status: false,
        message: USER.EXIEST,
        data: null,
      });
    } else {
      const saveData = new user(data);
      const saveResponse = await saveData.save();
      if (saveResponse) {
        return res.status(200).json({
          status: true,
          message: USER.CREATE,
          data: saveResponse,
        });
      } else {
        return res.status(500).josn({
          status: false,
          message: USER.SOMTHING_WRONG,
        });
      }
    }
  } catch (error) {
    throw error;
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await user.findOne({
      email: email,
    });
    if (findUser) {
      const matchedUser = bcrypt.compareSync(password, findUser.password);
      if (matchedUser) {
        const request = {
          _id: findUser._id,
          firstName: findUser.firstName,
          lastName: findUser.lastName,
          mobileNumber: findUser.mobileNumber,
        };
        const token = jsonwebtoken.sign(request, ENV_CCONST.secreate.jwt, {
          expiresIn: `${ENV_CCONST.secreate.jwt_expiry}`,
        });
        return res.status(200).json({
          status: true,
          data: { request, token },
          message: USER.LOGIN,
        });
      } else {
        return res.status(400).json({
          status: false,
          message: USER.PASSWORD_INCORRECT,
        });
      }
    } else {
      return res.status(400).json({
        status: false,
        data: USER.USER_NOT_FOUND,
      });
    }
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
const index = async (req, res) => {
  try {
    console.log("current user", req.currentUser);
    const data = { ...req.body };
    const sortKey = data.sortKey || "firstName";
    const sortDirection = data.sortDirection == "DESC" ? -1 : 1;
    const criteria = {
      isActive: true,
      isDeleted: false,
    };
    const options = {
      sort: { [sortKey]: sortDirection },
      page: data.page || 1,
      limit: data.limit || 10,
    };

    if (data.search) {
      Object.assign(criteria, {
        firstName: { $regex: data.search, $options: "i" },
      });
    }

    let request =
      data.page || data.limit
        ? await user.paginate(criteria, options)
        : await user.find(criteria).sort({
            [sortKey]: sortDirection,
          });
    if (request) {
      return res.status(200).json({
        status: 200,
        message: USER.USER_FATCHED,
        data: request,
      });
    }
  } catch (error) {
    throw error;
  }
};

const forgot = async (req, res) => {
  try {
    const { email } = req.body;
    const findUser = await user.findOne({ email: email });
    if (findUser) {
      const createOtp = otpGenerator();
      const payload = { otp: createOtp };
      const update = await user.findByIdAndUpdate(
        { _id: findUser._id },
        payload,
        { upsert: true, new: true }
      );
      await sendMail(
        email,
        ENV_CCONST.sendMailDetail.subject,
        `Hii ${findUser.firstName}, Your otp is ${createOtp} `
      );
      return res.status(200).json({
        status: true,
        message: USER.EMAIL_SEND_SUCCESSFULLY,
        data: update,
      });
    } else {
      return res.status(400).json({
        status: false,
        data: USER.USER_NOT_FOUND,
      });
    }
  } catch (error) {
    throw error;
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { otp, email, newPassword, retypePassword } = req.body;
    const findUser = await user.findOne({ email: email, otp: otp });
    if (findUser) {
      if (newPassword === retypePassword) {
        findUser.password = bcrypt.hashSync(
          newPassword,
          bcrypt.genSaltSync(ENV_CCONST.secreate.salt)
        );
        const update = await user.findByIdAndUpdate(
          { _id: findUser._id },
          { password: findUser.password, otp: null },
          { upsert: true, new: true }
        );
        if (update == null) {
          return res.status(400).json({
            status: false,
            message: USER.OTP_EXPIRE,
          });
        } else {
          return res.status(200).json({
            status: 200,
            message: USER.PASSWORD_CHANGE_SUCCESSFULLY,
            data: update,
          });
        }
      } else {
        return res.status(200).json({
          status: false,
          message: USER.PASSWORD_NOT_MATCH,
        });
      }
    } else {
      return res.status(400).json({
        status: false,
        data: USER.OTP_EXPIRE,
      });
    }
  } catch (error) {
    throw error;
  }
};
const testfunction = async (req, res) => {
  const { status } = req.body;

  const promise = new Promise((resolve, reject) => {
    if (status == "false") {
      reject(new Error("Something went wrong"));
    } else {
      resolve("Hello, World!");
    }
  });

  // Handle the promise
  promise
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
};
module.exports = {
  registration,
  index,
  login,
  forgot,
  verifyEmail,
  testfunction,
};
