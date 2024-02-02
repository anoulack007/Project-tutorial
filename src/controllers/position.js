const position = require('../model/position')

exports.CreatePosition = async(request,response) =>{
    const {poName} = request.body
    const duct = await position.findOne({poName});
    if (duct) {
      return response.status(409).send("User Mee poName ny leo");
  }
    const po = await position.create({poName})
    response.status(201).send(po)
}
exports.ReadManyPo = async(request,response)=>{
    const readPo = await position.find()
    response.status(200).send(readPo)
}
exports.ReadPo = async(request,response)=>{
    const {id} =request.params
    const show = await position.findById(id)
    response.status(200).send(show)
}
exports.UpdatePosition = async(request,response)=>{
    const{id}=request.params
    const{poName}=request.body
    const duct = await position.findOne({poName});
    if (duct) {
    return response.status(409).send("User Mee poName ny leo");}
    const po = await position.findByIdAndUpdate(id,{poName},{new:true})
    response.status(202).send(po);
}
exports.deletePosition=async(request,response)=>{
    const{id}=request.params
    const del = await position.findByIdAndDelete(id)
    response.status(200).send(del)
}