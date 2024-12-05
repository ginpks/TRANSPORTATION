import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../Back-End/authentication/user.js";


const factoryResponse = (status, message) => ({ status, message });

export const logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            res.json(factoryResponse(500, "Logout failed"));
            return;
        }
        res.json(factoryResponse(200, "Logout successful"));
    });
};
