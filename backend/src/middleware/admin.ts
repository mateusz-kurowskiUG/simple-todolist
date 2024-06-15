import type { Request, Response, NextFunction } from "express";

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roles = req.token?.realm_access?.roles || [];
    if (roles.includes("admin")) {
      console.log("User has admin role");
      next(); // Proceed to the next middleware or route handler
    } else {
      console.log("User does not have admin role");
      return res.status(403).send("Forbidden: User does not have admin role.");
    }
  } catch (err) {
    console.error("Role verification failed:", err);
    return res.status(401).send("Unauthorized: Role verification failed.");
  }
};

export default isAdmin;
