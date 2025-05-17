import bcrypt from 'bcrypt'
import account from '../Model/Account_Model/Account_index.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

export async function login(req, res, next) {

    
    try {
        const { username, password } = req.body;
        
        // check if user exists
        const user = await account.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // compare password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate a Token
        const token = jwt.sign(
            { ID: user._id, username: user.username }, 
            process.env.SECRET_ACCESS_KEY, 
            { expiresIn: "1h" }
        );
        
        res.cookie('token', token, {

            secure: process.env.NODE_ENV === 'production'? true : false,
            maxAge: 1000 * 60 * 60, // 1 hour
            httpOnly: true,
            sameSite: "Lax"

        })
        
        res.status(200).json({
            message: "log in successful"
        })

    }
    
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function register(req, res, next) {
    try {
        const { username, email, password } = req.body;

        // check if email already exists
        const existingEmail = await account.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // check if user already exists
        const existingUser = await account.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ messsage: "User already exists" });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user
        const newUser = new account({
            username,
            email,
            password: hashedPassword,
        });

        // save user
        await newUser.save();

        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser._id,
                email: newUser.email
            }
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function tokenDestroy(req, res ,next){
    try{

        res.clearCookie('token', token, {
            
            secure: process.env.NODE_ENV === 'production'? true : false,
            httpOnly: true,
            sameSite: "Lax"
            
        })
        res.status(200).json({
            message: "Cookie Destroyed"
        })
        
    }

    catch(e){
        res.status(500).json({
            message: "Server Error on Cookie Destroy"
        })
    }

}

export async function checkAuth(req, res, next){

    const token = req.cookies.token;

    if (!token) return res.status(403).json({ authentication: false });

    try {

        jwt.verify(token, process.env.SECRET_ACCESS_KEY);

        return res.status(200).json({ authentication: true });

    } 

    catch (err) {

        return res.status(403).json({ authentication: false });

    }
    
}

export async function verifyToken(req, res, next){

    const token = req.cookies.token;

    if (!token) return res.sendStatus(401);

    try {

        const decoded = jwt.verify(token, process.env.SECRET_ACCESS_KEY);
        req.user = decoded;

        next();
    } 

    catch (err) {

        return res.status(403).json({ message: 'Invalid token' });

    }
    
}
