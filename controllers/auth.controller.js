const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        const foundUser = await User.findOne({ email });

        if (foundUser) {
            return res.status(400).json({ errors: [{ msg: "Email should be unique" }] });
        }

        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({ name, email, password: hashPassword, phone });

        await newUser.save();

        // Token
        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, { expiresIn: "2h" });

        res.status(200).json({ success: [{ msg: "SUCCESS!" }], user: newUser, token });
    } catch (error) {
        res.status(400).json({ errors: [{ msg: "Registration failed" }], error });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            return res.status(400).json({ errors: [{ msg: "Email or password incorrect" }] });
        }
        const checkPassword = await bcrypt.compare(password, foundUser.password);
        if (!checkPassword) {
            return res.status(400).json({ errors: [{ msg: "Email or password incorrect" }] });
        }

        const token = jwt.sign({ id: foundUser._id }, process.env.SECRET_KEY, { expiresIn: "2h" });

        res.status(200).json({ success: [{ msg: "Login successful" }], user: foundUser, token });
    } catch (error) {
        res.status(400).json({ errors: [{ msg: "Login failed" }], error });
    }
};
