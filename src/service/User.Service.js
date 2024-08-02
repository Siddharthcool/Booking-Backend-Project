const UserModel = require("../model/User.Model")

async function CreateNewUserInDbService(name,email,encryptedPassword){

    try{
        const result =  await UserModel.create(
            {
            name,
            email,
            password : encryptedPassword
            }
    );
    if(result){
        return {
            success: true,
            data:result
        }
    }else{
        throw new Error("CreateNewUserInDbService unale to create user ");
    }

    console.log(result);

    }catch(error){
        console.log(error);
        return {sucess: false}
    }

}

async function GetUserByEmailFromDbService(email){

    try{
        const result = await UserModel.find({
            email
        })

        if(result.length){
            return {
                success: true,
                data:result[0]
            }}else{
                throw new Error("GetUserByEmailFromDbService unable to find user");
            }
        }catch(error){
        console.log(error);
        return {
            success:false
        }
    }
    }


module.exports= {CreateNewUserInDbService,GetUserByEmailFromDbService}