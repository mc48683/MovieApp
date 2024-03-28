import jsonwebtoken from "jsonwebtoken";
import userModel from "../models/user.model.js";
const tokenSecret = "randomsecret";

const tokenDecode = (req) => {
    try {
        const bearerHeader = req.headers['authorization'];
        if (bearerHeader) {
            const token = bearerHeader.split(' ')[1];

            return jsonwebtoken.verify(token, tokenSecret);

        }
        return false;

    } catch {
        return false
    }
};

const authUser = async (req, res, next) => {
    const tokenDecoded = tokenDecode(req);

    if(!tokenDecoded) {
        return res.status(401).send("Unauthorized");
    }
    
    const user = await userModel.findById(tokenDecoded.data);
    
    if (!user)  {
        return res.status(401).send("Unauthorized");
    }
    req.user = user;

    next();

};


const authAdmin = async (req, res, next) => {
    const tokenDecoded = tokenDecode(req);

    if(!tokenDecoded) {
        return res.status(401).send("Unauthorized");
    }
    
    const user = await userModel.findById(tokenDecoded.data);
    
    if (!user)  {
        return res.status(401).send("Unauthorized");
    }
    if (!(user.isAdmin)) {
        return res.status(401).send("Unauthorized");
    }
    req.user = user;

    next();

};

export default { authUser, tokenDecode, authAdmin };