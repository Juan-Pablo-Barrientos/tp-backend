import { JwtPayload } from "jsonwebtoken";

export interface AuthTokenPayload extends JwtPayload {
  id_user: number;
  role: string;
}