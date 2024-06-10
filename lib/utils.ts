import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify: any = (value: any) =>
  JSON.parse(JSON.stringify(value));

export function generateToken(payload: object) {
  const token = jwt.sign(payload, secret, { expiresIn: "15m" });

  return token;
}

export function verifyToken(token: string) {
  try {
    const verifJwt = jwt.verify(token, secret, {
      ignoreExpiration: true,
    });
    return verifJwt;
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      console.error("Token has expired");
      throw new Error("Token has expired");
    } else if (error.name === "JsonWebTokenError") {
      console.error("Invalid token");
      throw new Error("Invalid token");
    } else {
      console.error("Token verification failed");
      throw new Error("Token verification failed");
    }
  }
}

export function generateRefreshToken(payload: object) {
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

export function verifyRefreshToken(token: string) {
  try {
    console.log(token);
    if (!token || typeof token !== "string") {
      console.error("Invalid token refresh format");
      throw new Error("Invalid token format");
    }

    const verifJwt = jwt.verify(token, secret, {
      ignoreExpiration: true,
    });
    return verifJwt;
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      console.error("Refresh Token has expired");
      throw new Error("Refresh Token has expired");
    } else if (error.name === "JsonWebTokenError") {
      console.error("Invalid Refresh Token");
      throw new Error("Invalid Refresh Token");
    } else {
      console.error("Token Refresh Token failed");
      throw new Error("Token Refresh Token failed");
    }
  }
}

export function isTokenExpired(token: string): boolean {
  const decoded = jwt.decode(token) as { exp: number };
  if (!decoded || !decoded.exp) {
    throw new Error("Invalid token");
  }
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
}
