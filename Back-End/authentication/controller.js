import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../Back-End/authentication/user.js";


const factoryResponse = (status, message) => ({ status, message });

//login
export const login = async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json(factoryResponse(401, "Invalid credentials"));
    }
    req.login(user, (err) =>
        err ? next(err) : res.json(factoryResponse(200, "Login successful! Welcome!"))
      );
};

//logout
export const logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            res.json(factoryResponse(500, "Logout failed"));
            return;
        }
        res.json(factoryResponse(200, "Logout successful"));
    });
};
