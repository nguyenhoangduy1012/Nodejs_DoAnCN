const jwt = require("jsonwebtoken");
const config = require("../configs/auth.configs");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req,res,next) => {
    let token = req.headers["x-access-token"];
    
    if (!token) {
        return res.status(403).send({message: "No Token provided."});
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err) {
            return res.status(401).send({message: "Unauthorized."});
        }
        req.userId = decoded.id;
        next();
    })
}

isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user)=>{
        if(err){
            res.status(500).send({message:err});
            return;
        }

        Role.findById(user.roles, (err, roles)=>{
            if(err){
                
                res.status(500).send({message:err});
                return;
            }
            console.log(roles);
            if (roles.name == "admin") {
                next();
                return;
            }

            res.status(403).send({message: "Require Admin Role!"});
            return;
        })
    })
}

const authJwt = {
    verifyToken,
    isAdmin,
}

module.exports = authJwt;