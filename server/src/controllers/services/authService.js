import jwt from "../../lib/jwt.js";
import User from "../../models/User.js";
import bcrypt from 'bcrypt';


const authService = {
    async register(username, email, password, rePassword) {

        const user = await User.findOne().or([{email}, {username}]);

        if(rePassword !== password){
            throw new Error ('Password missmatch!')
        }

        if(user){
            throw new Error('User already exits');
           
        }
                   
        const newUser = await  User.create({
            username,
            email,
            password
        });
        return this.generateToken(newUser);
    },
    async login(email, password){
        console.log('Email provided:', email);
       
        const user = await User.findOne({ email });
     

     if(!user){
        throw new Error('User doesnt exist');
        
     }
     

     return this.generateToken(user);
   
    },
    async generateToken(user){
        const payload = {
            _id: user._id,
            email: user.email,
            username: user.username,
    
         };
         const header = { expiresIn: '3h'};
         const token = await jwt.sign(payload, process.env.JWT_SECRET, header);
    
         return token;
    }

};
export default authService;