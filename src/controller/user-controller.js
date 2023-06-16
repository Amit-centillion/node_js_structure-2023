import userModel from "../model/user";
import CONSTATNS from "../constants/messages/message";
const { RESPONSE_MESSAGE } = CONSTATNS;

const register = async (req, res) => {
  try {
    const { body } = req;
    let payload = {
      ...body,
    };
    const exiest = await userModel.findOne({ name: payload.name });
    if (exiest) {
      return res.status(200).send({
        status: 500,
        message: RESPONSE_MESSAGE.USER_EXIEST,
      });
    } else {
      const userCreta = new userModel(payload);
      const data = await userCreta.save();
      if (data != null) {
        return res.status(200).send({
          status: 200,
          message: RESPONSE_MESSAGE.USER_CREATE,
          data: data,
        });
      }
    }
  } catch (error) {
    throw error(error);
  }
};

export default {
  register,
};
