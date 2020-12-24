import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";

export const register = (req, res, next) => {
  const {
    username,
    email,
    password,
    first_name,
    last_name,
    summary,
  } = req.body;
  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User({
        username,
        email,
        password: hashedPw,
        role: "subscriber",
        first_name,
        last_name,
        summary,
      });
      return user.save();
    })
    .then((result) => {
      res.status(200).json({ message: "User created!", userId: result._id });
      console.log(result);
    })
    .catch((err) => {
      next(err);
      console.log(err);
    });
};

export const login = (req, res, next) => {
  const { email, password } = req.body;
  let loadedUser;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("User not found!");
        error.statusCode = 404;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password!");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        "somesuperprivatesecret"
      );
      res.status(200).json({
        token: token,
        user: {
          user_id: loadedUser._id.toString(),
          username: loadedUser.username,
          email: loadedUser.email,
          role: loadedUser.role,
          first_name: loadedUser.first_name,
          last_name: loadedUser.last_name,
          summary: loadedUser.summary,
        },
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      res.status(err.statusCode).json({ message: err.message });
    });
};

export const forgotPassword = (req, res, next) => {
  console.log(req);
  res.json({ message: "forgotPassword!" });
};

export const resetPassword = (req, res, next) => {
  console.log(req);
  res.json({ message: "resetPassword!" });
};
