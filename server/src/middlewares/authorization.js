import User from "../models/user";

export default (...roles) => {
  return function (req, res, next) {
    const userId = req.user.userId;
    User.findOne({ _id: userId })
      .then((user) => {
        if (!roles.includes(user.role)) {
          return res.sendStatus(403);
        }
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
