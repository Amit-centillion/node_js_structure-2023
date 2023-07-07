const user = require("../model/user");
const { verify } = require("jsonwebtoken");
const { MESSAGE } = require("../constants/message");
const { SERVER } = MESSAGE;
const { ENV_CCONST } = require("../constants/envVariable");
const { secreate } = ENV_CCONST;

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(500).json({
        status: false,
        messgae: SERVER.TOKEN_NOT_PASS,
      });
    } else {
      const token =
        authorization && authorization.startsWith("Bearer ")
          ? authorization.slice(7, authorization.length)
          : null;
      const verifyToken = verify(token, secreate.jwt);
      if (!verifyToken) throw new Error(SERVER.TOKEN_INVALID);
      const currentDate = Math.floor(Date.now() / 1000);
      if (currentDate > verifyToken?.exp) {
        return res.status(401).json({
          success: false,
          message: SERVER.SESSION_EXPIRE,
        });
      }
      const data = await user.findOne({ _id: verifyToken._id });
      req.currentUser = data;
      next();
    }
  } catch (error) {
    if (error) {
      return res.status(500).json({
        status: false,
        message: SERVER.SESSION_EXPIRE,
      });
    }
    throw error;
  }
};

module.exports = authentication;
