import { AUT_COOKIE_NAME } from "../constants.js";
import jwt from "../lib/jwt.js";

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies[AUT_COOKIE_NAME];

    if(!token){
        return next();
    }

try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedToken;
    req.isAuthenticated = true;
    res.locals.username = decodedToken.username;
    res.locals.user = decodedToken;
    res.locals.isAuthenticated = true;

     next();

} catch (err){
    res.clearCookie(AUT_COOKIE_NAME);

    return res.redirect('auth/login');
}
  
};

export const isAuth = (req, res, next) =>{
    if(!req.user){
       return res.redirect('/auth/login');
    }
    next();
}