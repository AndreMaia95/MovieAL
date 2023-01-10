import { UserModel } from "../models/users.js";
import bcrypt from 'bcrypt';

// create new user, verify if username already exists, verify if email already exists and if is valid, crypt password, verify if password have minum 8 characters 
export const createUser = async (req, res) => {
    const { username, password, email } = req.body;
    const user = await UserModel.findOne({ where: { username } });
    const emailExist = await UserModel.findOne({ where: { email } });
    if (user) {
        res.status(400).json({ message: "Username already exists" });
    } else if (emailExist) {
        res.status(400).json({ message: "Email already exists" });
    } else if (!validateEmail(email)) {
        res.status(400).json({ message: "Email is not valid" });
    } else if (password.length < 8) {
        res.status(400).json({ message: "Password must have at least 8 characters" });
    } else {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const newUser = await UserModel.create({ username, password: hash, email });
        res.status(201).json({ message: "User created successfully", newUser });
    }
};

// verify if email is valid
function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// get all users and dont show password
export const getAllUsers = async (req, res) => {
    const users = await UserModel.findAll({ attributes: { exclude: ['password'] } });
    res.status(200).json(users);
}

