require("dotenv").config();
require("../database/index").connect();
const express = require("express");
const {
  registerAcc,
  loginAcc,
  refreshAcc,
  ReadAcc,
  ReadAcc1,
  UpdateAcc,
  deleteAccount,
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
const { registerStaff,loginStaff,refreshStaff, ReadManyStaff, ReadStaff} = require("../controllers/staff");
const { jwtGenerateStaff, jwtValidateStaff, jwtRefreshTokenValidateStaff } = require("../middleware/jwtStaff");

const app = express();

app.use(express.json());
//account
app.post("/account/register", registerAcc);
app.post("/account/login", loginAcc);
app.post("/account/refreshToken", jwtRefreshTokenValidate, refreshAcc);
app.get("/account/read", jwtValidate, ReadAcc);
app.get("/account/read/:id", jwtValidate, ReadAcc1);
app.put("/account/update/:id", jwtValidate, UpdateAcc);
app.delete("/account/delete/:id", jwtValidate, deleteAccount);
//profile
app.post("/profile/create", Uploadpic, jwtValidate, CreateProfile);
app.get("/profile/read", jwtValidate, ReadManyProfile);
app.get("/profile/read/:id", jwtValidate, ReadOneProfile);
app.post("/profile/update/:id", Uploadpic, jwtValidate, UpdateProfile);
app.delete("/profile/delete/:id", DeleteProfile);
//responsibility
app.post("/responsibility/create", CreateRespon,jwtValidate);
app.get("/responsibility/readMany", ReadManyRespon,jwtValidate);
app.get("/responsibility/read/:id", ReadRespon,jwtValidate);
app.put("/responsibility/update/:id", UpdateRespon,jwtValidate);
app.delete("/responsibility/delete/:id", deleteRespon,jwtValidate);
//position
app.post("/position/create", CreatePosition,jwtValidate);
app.get("/position/readMany", ReadManyPo,jwtValidate);
app.get("/position/read/:id", ReadPo,jwtValidate);
app.put("/position/update/:id", UpdatePosition,jwtValidate);
app.delete("/position/delete/:id", deletePosition,jwtValidate);
//role
app.post("/role/create", CreateRole,jwtValidate);
app.get("/role/readMany", ReadManyRole,jwtValidate);
app.get("/role/read/:id", ReadRole,jwtValidate);
app.put("/role/update/:id", UpdateRole,jwtValidate);
app.delete("/role/delete/:id", deleteRole,jwtValidate);
//staff
app.post("/staff/register", registerStaff,);
app.post("/staff/login", loginStaff);
app.post("/staff/refreshToken",refreshStaff,jwtRefreshTokenValidateStaff );
app.get("/staff/read",jwtValidateStaff,ReadManyStaff);
app.get("/staff/read/:id",jwtValidateStaff,ReadStaff);
// app.put("/staff/update/:id", );
// app.delete("/staff/delete/:id",);

module.exports = app;
