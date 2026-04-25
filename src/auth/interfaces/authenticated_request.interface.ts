import { Request } from "express";
import { AuthTokenPayload } from "./auth_token_payload.interface";

export interface AuthenticatedRequest extends Request {
  user?: AuthTokenPayload;
}
