import userModel from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";
const tokenSecret = "randomsecret";

const register = async (req, res) => {
    try {
        const { username, password, displayName } = req.body;
        const checkUser = await userModel.findOne({username});
        
        if (checkUser) {
            return res.status(400).send("Username already taken");
        }

        const user = new userModel();
        user.displayName = displayName;
        user.username = username;
        user.setPassword(password);
        user.isAdmin = false;

        await user.save();

        const token = jsonwebtoken.sign({ data: user.id }, tokenSecret, { expiresIn: "24h"});

        responseHandler.created(res, {
            token,
            ...user._doc,
            id: user.id
          });
    }   catch {
            return res.status(500).send("Oops!Something went wrong");
    }

}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username }).select("username password salt id displayName isAdmin")
        if (!user) return res.status(400).send("User doesn't exist")
        if (!user.validPassword(password)) {
            return res.status(400).send("Incorrect password");                              
    
        }
        const token = jsonwebtoken.sign({ data: user.id }, tokenSecret, { expiresIn: "24h" });
        user.password = undefined;
        user.salt = undefined;
        responseHandler.created(res, {
            token,
            ...user._doc,
            id: user.id
          });

    } catch {
        return res.status(500).send("Oops!Something went wrong");
    }
}


const getInfo = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.status(200).send(user);
    } catch {
        return res.status(500).send("Oops!Something went wrong");
    }
};


export default { register, login, getInfo };