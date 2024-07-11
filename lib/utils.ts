import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";
import { PostInterface } from "@/types";

const secret = process.env.JWT_SECRET || "";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify: any = (value: any) =>
  JSON.parse(JSON.stringify(value));

export function generateToken(payload: object) {
  const token = jwt.sign(payload, secret, { expiresIn: "3d" });
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
      throw new Error("Refresh Token has expired");
    } else if (error.name === "JsonWebTokenError") {
      throw new Error("Invalid Refresh Token");
    } else {
      throw new Error("Token Refresh Token failed");
    }
  }
}

export function isTokenExpired(token: string): boolean {
  const decoded = jwt.decode(token) as { exp: number };
  if (!decoded || !decoded.exp) {
    return true;
  }
  const currentTime = Math.floor(Date.now());
  return decoded.exp * 1000 < currentTime;
}

export function dynamicToPostInterface(posts: []) {
  let temp: PostInterface[] = [];
  for (const post of posts) {
    temp.push(parseStringify(post));
  }
  return temp;
}

export const addHashtags = (text: string) => {
  const words = text.split(" ");
  const newHashtags = words.filter(
    (word) => word.startsWith("#") && word.length > 1
  );
  return newHashtags;
};
