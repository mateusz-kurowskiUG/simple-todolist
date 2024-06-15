import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const publicKey = process.env.REALM_PUBLIC || "null";

const decodeJwt = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!publicKey || publicKey === "null") {
      console.error("Public key is not set or invalid.");
      return res.status(500).send("Server error: public key not set.");
    }

    const bearer = req.headers.authorization;
    if (!bearer) {
      console.error("Authorization header is missing.");
      return res
        .status(401)
        .send("Unauthorized: Authorization header missing.");
    }

    const token = bearer.split(" ")[1];
    if (!token) {
      console.error("Bearer token is missing.");
      return res.status(403).send("Forbidden: Bearer token missing.");
    }

    const decoded = jwt.verify(
      token,
      `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`,
      { algorithms: ["RS256"] }
    );
    console.log("Decoded JWT:", decoded);
    req.token = decoded; // Attach the decoded token to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(401).send("Unauthorized: Token verification failed.");
  }
};

export default decodeJwt;
