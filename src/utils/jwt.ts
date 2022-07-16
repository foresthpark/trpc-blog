import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET || "secretcode";

export function signJwt(data: object) {
  return jwt.sign(data, SECRET, { expiresIn: "1h" });
}

export function verifyJwt<T>(token: string) {
  return jwt.verify(token, SECRET) as T;
}
