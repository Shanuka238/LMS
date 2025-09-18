const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'fad4f4ba4862fdec2cd50b55803c7a2e82f9dc084904b0270244e35a780794cbc838d43b5363b319bc5d3f3f3e22a2bcc9103c9f5fb6da3b95e90796fe28a8bf';

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) return res.status(401).json({error: 'No Token Provided'})

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if(err) return res.status(403).json({error: 'Invalid Token'})
        req.user = user;
        next();    
    })    
}

module.exports = authenticateToken;