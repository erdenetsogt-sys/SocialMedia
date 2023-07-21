const jwt = require("jsonwebtoken");
// const { SECRET_KEY } = require("../../config.js");

module.exports = (context) => {
  const AuthHeader = context.req.headers.authorization;
  if (AuthHeader) {
    //Bearer ....
    const token = AuthHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, "new_random_secret_key");
        return user;
      } catch (e) {
        throw new Error("Invalid/Expired token");
      }
    }
    throw new Error(`Authentication must be 'Bearer [token]'`);
  }
  throw new Error("Authorization header must be provided");
};
