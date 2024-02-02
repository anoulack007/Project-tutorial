require("dotenv").config();
const express = require("express");
const {
  registerAcc,
  loginAcc,
  refreshAcc,
  ReadAcc,
  ReadAcc1,
  UpdateAcc,
  deleteAccount,
  changePasswordAccount,
} = require("../controllers/account");
const {
  CreateProfile,
  ReadManyProfile,
  ReadOneProfile,
  UpdateProfile,
  DeleteProfile,
  Uploadpic,
} = require("../controllers/profile");
const {
  jwtValidate,
  jwtRefreshTokenGenerate,
  jwtRefreshTokenValidate,
} = require("../middleware/jwtAccount");
const {
  CreateRespon,
  UpdateRespon,
  ReadManyRespon,
  ReadRespon,
  deleteRespon,
} = require("../controllers/responsiblity");
const {
  CreatePosition,
  ReadPo,
  ReadManyPo,
  UpdatePosition,
  deletePosition,
} = require("../controllers/position");
const {
  CreateRole,
  ReadManyRole,
  ReadRole,
  UpdateRole,
  deleteRole,
} = require("../controllers/role");
const {
  registerStaff,
  loginStaff,
  refreshStaff,
  ReadManyStaff,
  ReadStaff,
  UpdateStaff,
  deleteStaff,
  changePasswordStaff,
} = require("../controllers/staff");
const {
  jwtGenerateStaff,
  jwtValidateStaff,
  jwtRefreshTokenValidateStaff,
} = require("../middleware/jwtStaff");

const app = express();

app.use(express.json());
//account
app.post("/account/register", registerAcc);
app.post("/account/login", loginAcc);
app.post("/account/refreshToken", jwtRefreshTokenValidate, refreshAcc);
app.get("/account/read", jwtValidate, ReadAcc,jwtValidateStaff);
app.get("/account/read/:id", jwtValidate, ReadAcc1,jwtValidateStaff);
app.put("/account/update/:id", jwtValidate, UpdateAcc,jwtValidateStaff);
app.delete("/account/delete/:id", jwtValidate, deleteAccount),jwtValidateStaff;
app.post("/account/changepassword/:id", changePasswordAccount,jwtValidateStaff);
//profile
app.post("/profile/create", Uploadpic, CreateProfile,jwtValidateStaff);
app.get("/profile/read",  ReadManyProfile,jwtValidateStaff);
app.get("/profile/read/:id",  ReadOneProfile,jwtValidateStaff);
app.post("/profile/update/:id", Uploadpic, UpdateProfile,jwtValidateStaff);
app.delete("/profile/delete/:id", DeleteProfile,jwtValidateStaff);
//responsibility
app.post("/responsibility/create", CreateRespon, jwtValidate,jwtValidateStaff);
app.get("/responsibility/read", ReadManyRespon, jwtValidate,jwtValidateStaff);
app.get("/responsibility/read/:id", ReadRespon, jwtValidate,jwtValidateStaff);
app.put("/responsibility/update/:id", UpdateRespon, jwtValidate,jwtValidateStaff);
app.delete("/responsibility/delete/:id", deleteRespon, jwtValidate,jwtValidateStaff);
//position
app.post("/position/create", CreatePosition, jwtValidate,jwtValidateStaff);
app.get("/position/read", ReadManyPo, jwtValidate,jwtValidateStaff);
app.get("/position/read/:id", ReadPo, jwtValidate,jwtValidateStaff);
app.put("/position/update/:id", UpdatePosition, jwtValidate,jwtValidateStaff);
app.delete("/position/delete/:id", deletePosition, jwtValidate,jwtValidateStaff);
//role
app.post("/role/create", CreateRole, jwtValidate,jwtValidateStaff);
app.get("/role/readMany", ReadManyRole, jwtValidate,jwtValidateStaff);
app.get("/role/read/:id", ReadRole, jwtValidate,jwtValidateStaff);
app.put("/role/update/:id", UpdateRole, jwtValidate,jwtValidateStaff);
app.delete("/role/delete/:id", deleteRole, jwtValidate,jwtValidateStaff);
//staff
app.post("/staff/register", registerStaff);
app.post("/staff/login", loginStaff);
app.post("/staff/refreshToken", refreshStaff, jwtRefreshTokenValidateStaff);
app.get("/staff/read", jwtValidateStaff, ReadManyStaff);
app.get("/staff/read/:id", jwtValidateStaff, ReadStaff);
app.put("/staff/update/:id", UpdateStaff, jwtValidateStaff);
app.delete("/staff/delete/:id", deleteStaff, jwtValidateStaff);
app.post("/staff/changepassword/:id", changePasswordStaff,jwtValidateStaff);

module.exports = app;
