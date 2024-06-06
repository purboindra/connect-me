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
  return jwt.sign(payload, secret, { expiresIn: "1d" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error("Invalid token");
  }
}

// export async function verifyPassword(
//   password: string,
//   hashedPassword: string
// ): Promise<boolean> {
//   return await bcrypt.compare(password, hashedPassword);
// }
