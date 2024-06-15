import type { NextFunction, Request, Response } from "express";

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.token?.sub;
    if (userId) {
      req.userId = userId;
      console.log("User ID:", userId);
      next(); // Proceed to the next middleware or route handler
    } else {
      return res.status(401).send("Unauthorized: User ID not found.");
    }
  } catch (err) {
    console.error("Error extracting user ID:", err);
    return res.status(500).send("Server error.");
  }
};

export default isAuthenticated;
