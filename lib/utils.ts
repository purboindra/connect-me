import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "purboyndra";

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
    const verifJwt = jwt.verify(token, secret);
    return verifJwt;
  } catch (error) {
    throw new Error("Invalid token");
  }
}

export function generateRefreshToken(payload: object) {
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

export function verifyRefreshToken(token: string) {
  try {
    const verifJwt = jwt.verify(token, secret);
    return verifJwt;
  } catch (error) {
    throw new Error("Invalid token");
  }
}
