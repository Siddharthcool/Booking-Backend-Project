const { CreateNewUserInDbService } = require("../service/User.Service");

async function CreateNewUserController(request, response) {
    try {
        const { name, email, password } = request.body;
        const result = await CreateNewUserInDbService(name, email, password);

        if (!result.success) {
            throw new Error("createNewUserInDbService failed to complete task");
        }
        // console.log(req.body);
        response.status(201).json({
            success: true,
            data: result.data,
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}

module.exports = {
    CreateNewUserController,
};