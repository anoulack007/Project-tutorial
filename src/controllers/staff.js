const staff = require('../model/staff')
const bcrypt = require('bcrypt')
const {jwtGenerateStaff, jwtRefreshTokenGenerateStaff} =require('../middleware/jwtStaff')


exports.registerStaff = async (request,response)=>{
    console.log(request)
    const{create_by_name, userName,password}= request.body
    if (!(create_by_name && userName && password)) {
        response.status(400).send("All input is required");
      }
      const oldStaff = await staff.findOne({ userName });
    
      if (oldStaff) {
        return response.status(409).send("User Already Exist. Please Login");
      }
    const encryptPassword = await bcrypt.hash(password,10)
    const emp = await staff.create({
        create_by_name,
        userName,
        password:encryptPassword
    })
    response.status(201).send(emp)
}
exports.loginStaff = async (request,response)=>{
    const{userName} = request.body
    const emp = await staff.findOne({userName})
    if(!emp){
        return response.sendStatus(400)
    }
    const access_token = jwtGenerateStaff(emp)
    const refresh_token = jwtRefreshTokenGenerateStaff(emp)

    response.json({
        access_token,
        refresh_token
    })
}
exports.refreshStaff = async (request,response)=>{
    const emp = staff.findOne({userName:request.staff})
    if(!emp) return response.sendStatus(401)
    const access_token = jwtGenerateStaff(emp)
    const refresh_token = jwtRefreshTokenGenerateStaff(emp)
    emp.refresh = refresh_token
    return response.json({
        access_token,
        refresh_token
    })
}
exports.ReadManyStaff = async (request, response) => {
    const emp = await staff.find().populate("profileId");
    response.status(200).send(emp);
  };
exports.ReadStaff = async (request, response) => {
    const { id } = request.params;
    const emp = await staff.findById(id).populate("profileId");
    response.status(200).send(emp);
};
exports.UpdateStaff=async(request,response)=>{
    const {id} = request.params
    const {userName,is_online,is_active_status,profileId}= request.body;
    const duct = await staff.findOne({ userName });
    if (duct) {
      return response.status(409).send("User Mee UserName ny leo");
    }
    const emp = await staff.findByIdAndUpdate(
        id,{userName,is_online,is_active_status,profileId},{new:true}
    )
    response.status(202).send(emp)
}
exports.deleteStaff = async (request, response) => {
    const { id } = request.params;
    const del = await staff.findByIdAndDelete(id);
    console.log(del);
    response.status(200).send(del);
  };