require("../routes/app");
const jwt = require("jsonwebtoken");
const staff = require("../model/staff");
const config = process.env;

const jwtGenerateStaff = (emp) => {
  const accessToken = jwt.sign(
    { userName: emp.userName, id: emp._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30m", algorithm: "HS256" }
  );
  return accessToken;
};
const jwtRefreshTokenGenerateStaff = (emp) => {
  const refreshToken = jwt.sign(
    { userName: emp.userName, id: emp._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d", algorithm: "HS256" }
  );
  return refreshToken;
};
const jwtValidateStaff = async (request, response, next) => {
  if (!request.headers["authorization"]) return response.sendStatus(401);
  const token = request.headers["authorization"].split("Bearer ")[1];
  
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const emp = await staff.findOne({ userName: decoded.userName });
  if (!emp) return response.sendStatus(401);
  request.Emp = decoded.userName;
  next();
};
const jwtRefreshTokenValidateStaff = async (request, response, next) => {
  try {
    if (!request.headers["authorization"]) return response.sendStatus(401);
    const token = request.headers["authorization"].split("Bearer ")[1];
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const emp = await staff.findOne({ userName: decoded.userName });
    if (!emp) return response.sendStatus(401);
    request.Emp = decoded.userName;
    next();
  } catch (err) {
    return response.sendStatus(403);
  }
};

module.exports = {
  jwtGenerateStaff,
  jwtRefreshTokenGenerateStaff,
  jwtValidateStaff,
  jwtRefreshTokenValidateStaff,
};
