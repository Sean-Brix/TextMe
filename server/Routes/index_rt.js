import express from 'express';

const router = express.Router();


import auth_rt from './Authentication_rt.js'
router.use('/auth', auth_rt);

import api_rt from './API/api_rt.js'
router.use('/api', api_rt);

router.get('/user', (req, res)=>{
    res.status(200).json({
        list: [
            {user: "Sean", email: "sean@gmail.com"},
            {user: "Kurt", email: "russel@gmail.com"},
            {user: "George", email: "george@gmail.com"},
            {user: "Christian", email: "dave@gmail.com"},
            {user: "Lance", email: "ivan@gmail.com"},
            {user: "Kristoffer", email: "kristo@gmail.com"},
        ]
    })

})


export default router;
