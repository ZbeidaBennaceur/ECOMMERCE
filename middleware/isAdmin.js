const jwt = require("jsonwebtoken");
const User = require("../model/User");

const isAdmin = async (req, res, next) => {
    try {
    
        const token = req.headers["authorization"];

        if (!token) {
            return res.status(400).json({ errors: [{ msg: "Pas de token" }] });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);
        const foundUser = await User.findOne({ _id: decode.id });

        if (!foundUser) {
            return res.status(400).json({ errors: [{ msg: "Utilisateur non trouvé" }] });
        }

        if (!foundUser.isAdmin) {
            return res.status(403).json({ errors: [{ msg: "Accès refusé : admin uniquement" }] });
        }

        req.user = foundUser;
        next();
    } catch (error) {
        return res.status(400).json({ errors: [{ msg: "Impossible de vérifier", error: error.message }] });
    }
};

module.exports = isAdmin;
