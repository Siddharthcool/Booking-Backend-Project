const UserModel = require("../model/User.Model")

async function CreateNewUserInDbService(name,email,password){

    try{
        const result = UserModel.create(
            {
            name,
            email,
            password
            }
    );
    if(result){
        return {
            success: true,
            data:result
        }
    }

    console.log(result);

    }catch(error){
        console.log(error);
        return {sucess: false}
    }

}

module.exports= {CreateNewUserInDbService}