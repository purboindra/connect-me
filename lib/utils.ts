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
  return jwt.sign(payload, secret, { expiresIn: "3d" });
}

export function verifyToken(token: string) {
  try {
    console.log(`secret: ${secret}`);
    const verifJwt = jwt.verify(token, secret);
    console.log(`Verif JWT: ${verifJwt}`);

    return verifJwt;
  } catch (error) {
    throw new Error("Invalid token");
  }
}
