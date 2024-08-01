const { request, response } = require("express");
const {
  CreateNewCityInDbService,
  GetAllCitiesInDbService,
    UpdateCityInDBService, 
    DeleteCityControllerInDbService} = require("../service/City.Service");

// const express= require('express');
async function CreateMewCityController(request, response) {
  try {
    const { name, image, description, cuisines } = request.body;
    console.log(request.body, "hello");
    const result = await CreateNewCityInDbService(
      name,
      image,
      description,
      cuisines
    );

    if (!result.success) {
      throw new Error("CreateNewCityInDbService failed to compplete task ");
    }
    response.status(201).json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      success: false,
      message: "something went wrong ",
    });
  }
}

async function GetAllCitiesController(request, response) {

  
  try {
    const result = await GetAllCitiesInDbService();

    if (result.success) {

        const DATA = result.data.map((element)=>{
            const{_id,name,image, description,cuisines} = element;
            return { id:_id , name , image, description ,cuisines};
        });
      response.status(201).json({
        success: true,
        data : DATA
      });
    } else {
      throw new Error("ControllerInDbService failed to complete task");
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({
      success: false,
      message: "something went wrong ",
    });
  }
}

async function UpdateCityController(request,response){

    try{

        const {id : cityId} = request.query

        const {name, description, image, cuisines} = request.body

        const DATA = {}

        if(name){
            DATA.name = name
        }

        if(description){
            DATA.description = description
        }

        if(image){
            DATA.image = image
        }

        if(cuisines){
            DATA.cuisines = cuisines
        }

        const result = await UpdateCityInDBService(cityId, DATA)

        if(result.success){

           response.status(200).json({
                success : true,
                data : response.data
           })

        }else{
            throw new Error("UpdateACityInDBService didn't give result")
        }


    }catch(error){
        console.log(error)
        response.status(500).json({
            success : false,
            message : "Something went wrong" 
        })
    }
}

async function DeleteCityController(request, response) {
    try {
      const { id: cityId } = request.query;
  
      const result = await DeleteCityControllerInDbService(cityId);
  
      if (result.success) {
        response.status(200).json({
          success: true,
          message: "City deleted successfully"
        });
      } else {
        throw new Error("DeleteCityInDbService failed to complete task");
      }
    } catch (error) {
      console.log(error);
      response.status(500).json({
        success: false,
        message: "something went wrong"
      });
    }
  }

module.exports = {
  CreateMewCityController,
  GetAllCitiesController,
  UpdateCityController,
  DeleteCityController
};
