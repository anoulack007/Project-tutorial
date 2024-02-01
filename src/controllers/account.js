const acc = require("../model/account");
const bcrypt = require("bcrypt");
const {
  jwtGenerate,
  jwtRefreshTokenGenerate,
} = require("../middleware/jwtAccount");
// const { response } = require('../routes/app')

exports.registerAcc = async (request, response) => {
  const { userName, password } = request.body;
  if (!(userName && password)) {
    response.status(400).send("All input is required");
  }
  const oldAcc = await acc.findOne({ userName });

  if (oldAcc) {
    return response.status(409).send("User Already Exist. Please Login");
  }
  const encryptPassword = await bcrypt.hash(password, 10);
  const acc1 = await acc.create({
    userName,
    password: encryptPassword,
  });

  response.status(201).send(acc1);
};

exports.loginAcc = async (request, response) => {
  const { userName } = request.body;
  const acc2 = await acc.findOne({ userName });
  if (!acc2) {
    return response.sendStatus(400);
  }
  const access_token = jwtGenerate(acc2);
  const refresh_token = jwtRefreshTokenGenerate(acc2);

  response.json({
    access_token,
    refresh_token,
  });
};

exports.refreshAcc = async (request, response) => {
  const account = acc.findOne({ userName: request.acc });

  if (!account) return response.sendStatus(401);
  const access_token = jwtGenerate(account);
  const refresh_token = jwtRefreshTokenGenerate(account);
  account.refresh = refresh_token;
  return response.json({
    access_token,
    refresh_token,
  });
};
exports.ReadAcc = async (request, response) => {
  const account = await acc.find().populate("profileId");
  response.status(200).send(account);
};
exports.ReadAcc1 = async (request, response) => {
  const { id } = request.params;
  const account = await acc.findById(id).populate("profileId");
  response.status(200).send(account);
};
exports.UpdateAcc = async (request, response) => {
  const { id } = request.params;
  const { userName, is_online, is_active_status, profileId } = request.body;
  // ດັກໄອດີ
  const duct = await acc.findOne({ userName });
  if (duct) {
    return response.status(409).send("User Mee UserName ny leo");
  }
  const account = await acc.findByIdAndUpdate(
    id,
    { userName, is_online, is_active_status, profileId: profileId },
    { new: true }
  );
  response.status(202).send(account);
};
exports.deleteAccount = async (request, response) => {
  const { id } = request.params;
  const del = await acc.findByIdAndDelete(id);
  console.log(del);
  response.status(200).send(del);
};
