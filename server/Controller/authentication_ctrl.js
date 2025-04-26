import bcrypt from 'bcrypt'
import account from '../Model/Account_Model/Account_index.js'

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

        // store user session
        req.session.userId = user._id;
        req.session.username = user.username;
        
        req.session.save((err)=>{
            if(err){
                return res.status(500).json({
                    error: err
                })
            }

            // successful login
            return res.status(200).json({
                message: "Login successful",
                user: {
                    id: user._id,
                    username: user.username
                }
            });

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

export async function sessionDestroy(req, res ,next){
    req.session.destroy((err)=>{

        if (err) {
            console.error('Failed to destroy session:', err);
            return res.status(500).json({
                message: "Server Error, Could not logout"
            });
        }

        res.clearCookie('connect.sid');
        res.status(200).json({
        message: "Session Destroyed"
        })

    });
}

export async function session_check(req, res, next){

    try{
        if(req.session.userId){
            return res.status(200).json({
                authenticated: true
            })
        }
        
        res.status(401).json({
            authenticated: false
        })
    }
    catch(err){
        console.log("Session Check Error: " + err);
        res.status(500).json({
            error: err
        })
    }
    
}