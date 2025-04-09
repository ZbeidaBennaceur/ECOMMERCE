const User = require("../model/User")

exports.getAllUsers = async (req, res) => {
    try {
        const listUsers = await User.find();
        console.log(" Users found", listUsers);
        res.status(200).json({ success: { msg: "List of all users" }, listUsers })

    } catch (error) {
        res.status(400).json({ errors: { msg: "Can't find the users" } })

    }
  
}

exports.getOneUser = async (req, res) => {
    try {
        const oneUser = await User.findById(req.params.id);
        console.log(" User found", oneUser);
        res.status(200).json({ success: { msg: "The user is" }, oneUser })

    } catch (error) {
        res.status(400).json({ errors: { msg: "Can't find the user" } })

    }
  
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userToDelete = await User.findByIdAndDelete(id)
        res.status(200).json({ success: { msg: "User deleted successufly" } })

    } catch (error) {

        res.status(400).json({ errors: { msg: "Cannot delete user" } })
    }

}
