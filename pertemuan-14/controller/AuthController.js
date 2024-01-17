//membuat kelas authcontroller
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
    async register(req, res) {
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
    username: username,
    email: email,
    password: hash,
    });

    console.log(newUser);
    try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
    }
    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
    username: username,
    email: email,
    password: hash,
    });

    console.log(newUser);

    let data = {
    message: "User Created Successfully",
    data: newUser,
    };
    res.status(201).json(data);
    } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    }
    }
    async login(req, res) {
    try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });
    const match = await bcrypt.compare(password, user.password);

    if (!user || !match) {
    return res.status(400).json({ error: "All fields are required" });
    }
    const pyload = {
    id: user.id,
    username: user.username,
    };
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(pyload, secret, { expiresIn: "1h" });
    const response = {
    massage: "Login Success",
    data: {
    token: token,
    },
    };

    return res.status(200).json(response);
    } catch (error) {
    return res.status(401).json({ error: "Invalid Credentials2" });
    }
    }
}

//membuat object auth
export default new AuthController();
