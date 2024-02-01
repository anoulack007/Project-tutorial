const role = require('../model/role')



exports.CreateRole = async(request,response) =>{
    const {roName} = request.body
    const ro = await role.create({roName})
    response.status(201).send(ro)
}
exports.ReadManyRole = async(request,response)=>{
    const ro = await role.find()
    response.status(200).send(ro)
}
exports.ReadRole = async(request,response)=>{
    const {id} =request.params
    const show = await role.findById(id)
    response.status(200).send(show)
}
exports.UpdateRole = async(request,response)=>{
    const{id}=request.params
    const{roName}=request.body
    const duct = await role.findOne({roName});
    if (duct) {
    return response.status(409).send("User Mee resName ny leo");}
    const roNa = await role.findByIdAndUpdate(id,{roName},{new:true})
    response.send(202).send(roNa);
}
exports.deleteRole=async(request,response)=>{
    const{id}=request.params
    const del = await role.findByIdAndDelete(id)
    response.status(200).send(del)
}