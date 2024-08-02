const User = require("../model/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const createUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const exists = await User.findOne({ email })
        if (exists) {
            res.status(404).json({ message: "user name already taken" })
        }
        else if(!exists) {
            const hassPassword = await bcrypt.hash(password, 10)
            const saveUser = new User({ email, password: hassPassword })
            await saveUser.save()
            res.status(200).json({ message: "user successfuly signed up" })
        } 
       
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" })
    }
}
const loginUser = async (req, res) =>{
    try {
        const { email, password } = req.body
        const exists = await User.findOne({email})
        
         if (!exists || !(await bcrypt.compare(password,exists.password))){
            res.status(404).json({message : "user not found"})
        }
         const token = jwt.sign({userid :exists._id} ,"Afrin")
         res.status(200).json(token)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" })
    }
    }

module.exports = {createUser,loginUser}