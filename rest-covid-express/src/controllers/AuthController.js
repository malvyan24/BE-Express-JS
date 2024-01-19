//membuat kelas authcontroller
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

class AuthController {
    async register(req, res) {

    const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        console.log(errors)
    try{

        const { username, email, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
    
        const newUser = await User.create({
        username: username,
        email: email,
        password: hash,
        });
    
        console.log(newUser);
        // try {
        let data = {
            message: "User Created Successfully",
            data: newUser,
        };
        res.status(201).json(data);
        // } catch (error) {
        // }
    }catch(error){
        res.status(500).json({ error: "Internal Server Error" });

        // console.log(error)
    }
    }

    async login(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
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
        console.log(error)
    return res.status(401).json({ error: "Invalid Credentials2" });
    }
    }
}
const object = new AuthController();

// export PatientController
module.exports = object;
