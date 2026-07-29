/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";

const verifyToken = (token: string | undefined, secret: string) => {
  if (!token) {
    return { success: false, error: "NO_TOKEN" };
  }

  try {
    const verifiedToken = jwt.verify(token, secret);
    return { success: true, data: verifiedToken };
  } catch (error: any) {
    if (error.name !== "TokenExpiredError") {
      console.log("Token verification failed:", error.name);
    }
    return { success: false, error: error.message };
  }
};

export const jwtUtils = { verifyToken };
