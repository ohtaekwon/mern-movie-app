import userModel from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";
import "dotenv/config";

const signUp = async (req, res) => {
  try {
    const {
      body: { email, password, displayName },
    } = req;

    const checkUser = await userModel.findOne({ email });

    if (checkUser) {
      return responseHandler.badRequest(res, "username already used");
    }
    const user = new userModel();

    user.displayName = displayName;
    user.email = email;
    user.setPassword(password);

    await user.save();

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch {
    responseHandler.error(res);
  }
};

const signIn = async (req, res) => {
  try {
    const {
      body: { email, password },
    } = req;

    const user = await userModel
      .findOne({ email })
      .select("email password salt id displayName");

    if (!user) return responseHandler.badRequest(res, "User not exist");

    if (!user.validPassword(password)) {
      return responseHandler.badRequest(res, "Wrong password");
    }

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );
    user.password = undefined;
    user.salt = undefined;

    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch {
    responseHandler.error(res);
  }
};
const updatePassword = async (req, res) => {
  try {
    const {
      body: { password, newPassword },
      user: { id },
    } = req;

    const user = await userModel.findById(id).select("password id salt");
    if (!user) return responseHandler.unauthorize(res);
    if (!user.validPassword(password)) {
      return responseHandler.badRequest(res, "Wrong password");
    }
    user.setPassword(newPassword);
    await user.save(); // 데이터를 저장
    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};
const getInfo = async (req, res) => {
  try {
    const {
      user: { id },
    } = req;
    const user = await userModel.findById(id);
    if (!user) return responseHandler.notFound(res);
    responseHandler.ok(res, user);
  } catch {
    responseHandler.error(res);
  }
};

export default {
  signIn,
  signUp,
  getInfo,
  updatePassword,
};
