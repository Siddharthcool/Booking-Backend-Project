const { response } = require("express");
const CityModel = require("./../model/City.Model")

async function CreateNewCityInDbService(name , image , description , cuisines ){
    try{

        const result = await CityModel.create(
            {
                name,
                image,
                description,
                cuisines
            }
        );

        if(result){
            return {
                success: true,
                data:result
            }
        }

        console.log(result);
    }
    catch(error){   
        console.log(error);
        return{
            success:false
        }
    }
};

async function GetAllCitiesInDbService(){


    try{

        const result = await  CityModel.find()

        if(result){
            return {
                success:true,
                data:result
            }
        }else{
            throw new error("GetallCitiesdbservice in uable to get cities ")
    }
        
    }catch(error){   
        console.log(error);
        return{
            success:false
        }
    }

}

async function UpdateCityInDBService(cityId, data){
    try{

        const {name, description, cuisines, image} = data

        const cityDocument = await CityModel.findById(cityId)

        if(name){
            cityDocument.name = name
        }
        
        if(description){
            cityDocument.description = description
        }

        if(cuisines){
            cityDocument.cuisines = cuisines
        }

        if(image){
            cityDocument.image = image
        }

        const result = await cityDocument.save()

        if(result){

            return {
                success : true,
                data : result
            }

        }else{
            throw new Error(`UpdateACityInDBService unable to update the city with id : ${cityId}`)
        }

    }catch(err){
        console.log(err)
        return {
            success : false
        }
    }
}

async function DeleteCityControllerInDbService(cityId){

    try {
        const result = await CityModel.findByIdAndDelete(cityId);

        if (result) {
            return {
                success: true,
                data: result
            };
        } else {
            return {
                success: false,
                message: "City not found"
            };
        }
    } catch (err) {
        console.log(err);
        return {
            success: false
        };
    }
}

module.exports = {
    CreateNewCityInDbService,
    GetAllCitiesInDbService,
    UpdateCityInDBService,
    DeleteCityControllerInDbService
}