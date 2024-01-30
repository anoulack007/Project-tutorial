const profile = require('../model/profile')
const account = require('../model/account')






exports.CreateProfile = async(request,response)=>{
    const{firstName,surName,age,address,email,AccId} = request.body
    const pro = await profile.create({
        firstName,
        surName,
        age,
        address,
        email,
    })
    await account.findByIdAndUpdate({_id:AccId},{profileId:pro._id})
    response.status(201).send(pro)
}


exports.ReadManyProfile = async(request,response)=>{
    const pro = await profile.find()
    response.status(200).send(pro);
}
exports.ReadOneProfile = async(request,response)=>{
    const {id} = request.params
    const pro = await profile.findById(id)
    response.status(200).send(pro);
}
exports.UpdateProfile = async(request,response)=>{
    const { id } = request.params;
    const {firstName,surName,age,address,email,image} = request.body;
    // ດັກໄອດີ 
    const duct = await profile.findOne({firstName});
    if (duct) {
    return response.status(409).send("User Mee firstName ny leo");}

    const pro = await profile.findByIdAndUpdate(id,{firstName,surName,age,address,email,image}, { new: true });
    response.status(202).send(pro);
}
exports.DeleteProfile=async(request,response)=>{
    const{id}=request.params
    const del = await profile.findByIdAndDelete(id)
    console.log(del)
    response.status(200).send(del)
}