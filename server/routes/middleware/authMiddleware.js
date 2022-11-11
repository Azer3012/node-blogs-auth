import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const token = req.cookies['app-access-token'];

    console.log(token);
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, function (error, decoded) {
        if (error) {
          res.status(401).send({
            message: error.message,
          });
          return;
        }
        const { exp, iat, ...userData } = decoded;
        if (exp < Date.now() / 1000) {
          res.status(401).send({
            message: 'Your session has expired!',
          });
        } else {
          req.user = userData;
          next();
        }
      });
    } else {
      res.status(401).send({
        message: 'Unauthorized request!',
      });
    }
  
};

export  {authMiddleware};
