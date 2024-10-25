import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const middleware = async (req, res, next) => {
    try {
        // Check if Authorization header exists
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: "Unauthorized, no token provided" });
        }

        const token = authHeader.split(' ')[1]; // Extract token
        const decoded = jwt.verify(token, "secretkeyofnoteapp123"); // Verify token using the secret key

        if (!decoded) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }

        // Fetch the user by ID from the decoded token
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Attach user to the request object
        req.user = { name: user.name, id: user._id };

        next();
    } catch (error) {
        console.error("Middleware error: ", error.message);
        return res.status(500).json({ success: false, message: "Server error, please login again" });
    }
};

export default middleware;
