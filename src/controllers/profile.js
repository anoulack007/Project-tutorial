const profile = require("../model/profile");
const account = require("../model/account");
const multer = require("multer");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (request, file, cb) {
    cb(null, "./src/image");
  },
  filename: function (request, file, cb) {
    cb(null, file.originalname);
  },
});

exports.CreateProfile = async (request, response) => {
  const { firstName, surName, age, address, email, AccId } = request.body;
  const image = request.file.filename;
  const pro = await profile.create({
    firstName,
    surName,
    age,
    address,
    email,
    image,
  });

  if (AccId) {
    await account.findByIdAndUpdate({ _id: AccId }, { profileId: pro._id });
  }
  response.status(201).send(pro);
};

exports.ReadManyProfile = async (request, response) => {
  const pro = await profile.find().populate('poId').populate('roleId').populate('resIds')
  response.status(200).send(pro);
};
exports.ReadOneProfile = async (request, response) => {
  const { id } = request.params
  const pro = await profile.findById(id).populate('poId').populate('roleId').populate('resIds')
  response.status(200).send(pro);
};
exports.UpdateProfile = async (request, response) => {
  const { id } = request.params;
  const { resIds,firstName, surName, age, address, email,poId,roleId } = request.body;
  const duct = await profile.findOne({firstName});
  if (duct) {
    return response.status(409).send("User Mee firstName ny leo");
}
  const searchPic = await profile.findById({ _id: id });
  if (searchPic.image !== undefined) {
    const pic = request.file.filename;

    if (fs.existsSync("./src/image/" + searchPic.image)) {
      fs.unlink("./src/image/" + searchPic.image, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Remove success");
        }
      })}
      const pro = await profile.findByIdAndUpdate(id,{ poId:poId,roleId:roleId,resIds:resIds,firstName, surName, age, address, email, image:pic },{ new: true });
      response.status(202).send(pro);
  }

}
exports.DeleteProfile = async (request, response) => {
  const { id } = request.params;

  const deletePic = await profile.findById({ _id: id });
  if (deletePic.image !== undefined) {
    console.log(deletePic.image);
    if (fs.existsSync("./src/image/" + deletePic.image)) {
        fs.unlink("./src/image/" + deletePic.image, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Remove success");
          }
        })}
        const del = await profile.findByIdAndDelete(id);
        response.status(202).send(del)
}}

exports.Uploadpic = multer({
  storage: storage,
}).single("image");
