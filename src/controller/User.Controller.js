const {CreateNewUserInDbService ,GetUserByEmailFromDbService} = require("./../service/User.Service")
const bcrypt = require("bcrypt");

async function CreateNewUserController(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(404).json({
                success: false,
                message: "email, name or password is required",
            });
            return;
        }

        const SALT = bcrypt.genSaltSync(10);
        const encryptedPassword = bcrypt.hashSync(password, SALT);

        const result = await CreateNewUserInDbService(
            name,
            email,
            encryptedPassword
        );

        if (!result.success) {
            throw new Error("createNewUserInDbService failed to complete task");
        }
        // console.log(req.body);
        res.status(201).json({
            success: true,
            message: "user registered successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}

async function SigninUserController(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            const err = new Error("email and password are required");
            err.status = 400;
            throw err;
        }

        //step1: we have to verify the email and password
        const userResult = await GetUserByEmailFromDbService(email);

        if (!userResult.success) {
            const err = new Error("Invalid Credentials");
            err.status = 400;
            throw err;
        }

        //checking password
        const { password: encryptedPassword } = userResult.data;

        const passwordCompareResult = bcrypt.compareSync(
            password,
            encryptedPassword
        );

        if (!passwordCompareResult) {
            const err = new Error("Invalid email or password");
            err.status = 400;
            throw err;
        }else{
            console.log("success");
        }

        //step2: we will generate the token and send back to the user
    } catch (error) {
        console.log(error);
        res.status(error.status ? error.status : 500).json({
            success: false,
            message: error.status ? error.status : "something went wrong",
        });
    }
}

module.exports = {
    CreateNewUserController,
    SigninUserController
};