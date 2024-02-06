const responsibility = require('../model/responsilbility')



exports.CreateRespon = async(request,response) =>{
    const {resName} = request.body
    const duct = await responsibility.findOne({ resName });
    if (duct) {
      return response.status(409).send("User Mee resName ny leo");
    }
    const respon = await responsibility.create({resName})
    response.status(201).send(respon)
}
exports.ReadManyRespon = async(request,response)=>{
    const readRes = await responsibility.find()
    response.status(200).send(readRes)
}
exports.ReadRespon = async(request,response)=>{
    const {id} =request.params
    const show = await responsibility.findById(id)
    response.status(200).send(show)
}
exports.UpdateRespon = async(request,response)=>{
    const{id}=request.params
    const{resName}=request.body
    const duct = await responsibility.findOne({resName});
    if (duct) {
    return response.status(409).send("User Mee resName ny leo");}
    const respon = await responsibility.findByIdAndUpdate(id,{resName},{new:true})
    response.status(202).send(respon);
}
exports.deleteRespon=async(request,response)=>{
    const{id}=request.params
    const del = await responsibility.findByIdAndDelete(id)
    if (!del) {
        response.status(409).send("Delete Responsiblity Ny leo");
      } else {
        response.status(200).send(del);
      }
}