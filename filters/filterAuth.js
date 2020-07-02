const { SECRET_KEY, INITIAL_ID } = require('../props/setup');

const { AuthPosts } = require('../helpers/reponsePosts');
const jwt = require('jsonwebtoken');

module.exports = {
    validateTokenGetUser: () => {
        return (req, res, next) => {
            const bearerHeader = req.headers.authorization;
            if(typeof bearerHeader !== 'undefined') {            
                
                const bearer = bearerHeader.split(' ');
                const bearerToken = bearer[1];                
                                
                jwt.verify(bearerToken, SECRET_KEY, (err, decoded) => {
                    if(err) {
                        return res.json(
                            {
                                fail: true,
                                message: AuthPosts.INVALID,
                                records: []
                            }
                        );   
                    } else {                                                                     
                        req.decoded = decoded._id.toString().substring(INITIAL_ID.length, decoded._id.length);                        
                        next();
                    }
                });                                   

            }else {
                return res.json(
                    {
                        fail: true,
                        message: AuthPosts.INVALID,
                        records: []
                    }
                );
            }

            //next();
        }
    },    
    validateToken: () => {
        return (req, res, next) => {
            const bearerHeader = req.headers.authorization;
            if(typeof bearerHeader !== 'undefined') {            
                
                const bearer = bearerHeader.split(' ');
                const bearerToken = bearer[1];                
                                
                jwt.verify(bearerToken, SECRET_KEY, (err, authData) => {
                    if(err) {
                        return res.json(
                            {
                                fail: true,
                                message: AuthPosts.INVALID,
                                records: []
                            }
                        );   
                    } else {
                        next();
                    }
                });                                   

            } else {
                return res.json(
                    {
                        fail: true,
                        message: AuthPosts.INVALID,
                        records: []
                    }
                );
            }            

            //next();
        }
    }
}