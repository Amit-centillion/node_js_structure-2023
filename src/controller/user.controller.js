const user = require("../model/user");
const { PaginateOptions, PaginateResult } = require("mongoose");
const update = async (req, res) => {
  try {
    const data = { ...req.body };
    const findUser = await user.findOne({ firstName: data.firstName });
    if (findUser != null) {
      return res.status(400).json({
        status: false,
        message: "user alrady exiest !",
        data: null,
      });
    } else {
      const saveData = new user(data);
      const saveResponse = await saveData.save();
      if (saveResponse) {
        return res.status(200).json({
          status: true,
          message: "user created successfully.",
          data: saveResponse,
        });
      } else {
        return res.status(500).josn({
          status: false,
          message: "something went wrong !",
        });
      }
    }
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
const index = async (req, res) => {
  try {
    const data = { ...req.body };
    console.log("data", data);
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
        message: "user fetched successfully.",
        data: request,
      });
    }
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
module.exports = {
  update,
  index,
};
