const jwt = require("jsonwebtoken");

export function authenticateJWT( req: any, res: any, next: any){
    const auth = req.headers.authorization;
    if(!auth?.startsWith('bearer ')){
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = auth.split(' ')[1];
    try {
        const jwtDecoded = jwt.verify(token, process.env.AUTH_SECRET);
        req.user = jwtDecoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}