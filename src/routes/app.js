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


const app = express();

app.use(express.json());
//account
app.post("/account/register", registerAcc);
app.post("/account/login", loginAcc);
app.post("/account/refreshToken", jwtRefreshTokenValidate, refreshAcc);
app.get("/account/read", jwtValidate, ReadAcc);
app.get("/account/read/:id", jwtValidate, ReadAcc1,);
app.put("/account/update/:id", jwtValidate, UpdateAcc,);
app.delete("/account/delete/:id", jwtValidate, deleteAccount);
app.post("/account/changepassword/:id",jwtValidate, changePasswordAccount,);
//profile
app.post("/profile/create",jwtValidate, Uploadpic, CreateProfile);
app.get("/profile/read",jwtValidate,  ReadManyProfile);
app.get("/profile/read/:id",jwtValidate,  ReadOneProfile,);
app.put("/profile/update/:id",jwtValidate, Uploadpic, UpdateProfile);
app.delete("/profile/delete/:id",jwtValidate, DeleteProfile);
//responsibility
app.post("/responsibility/create",jwtValidate, CreateRespon, );
app.get("/responsibility/read",jwtValidate, ReadManyRespon,);
app.get("/responsibility/read/:id", jwtValidate, ReadRespon,);
app.put("/responsibility/update/:id", jwtValidate, UpdateRespon,);
app.delete("/responsibility/delete/:id", jwtValidate, deleteRespon,);
//position
app.post("/position/create", jwtValidate, CreatePosition,);
app.get("/position/read", jwtValidate, ReadManyPo,);
app.get("/position/read/:id", jwtValidate, ReadPo,);
app.put("/position/update/:id", jwtValidate, UpdatePosition,);
app.delete("/position/delete/:id", jwtValidate, deletePosition,);
//role
app.post("/role/create",jwtValidate, CreateRole, );
app.get("/role/read", jwtValidate,ReadManyRole, );
app.get("/role/read/:id", jwtValidate, ReadRole,);
app.put("/role/update/:id",  jwtValidate,UpdateRole,);
app.delete("/role/delete/:id",jwtValidate, deleteRole, );
//staff
app.post("/staff/register", registerStaff);
app.post("/staff/login", loginStaff);
app.post("/staff/refreshToken",jwtRefreshTokenValidate, refreshStaff );
app.get("/staff/read",jwtValidate ,jwtRefreshTokenValidate, ReadManyStaff);
app.get("/staff/read/:id",jwtValidate , ReadStaff);
app.put("/staff/update/:id", jwtValidate, UpdateStaff,);
app.delete("/staff/delete/:id",jwtValidate, deleteStaff);
app.post("/staff/changepassword/:id",jwtValidate, changePasswordStaff);

module.exports = app;
