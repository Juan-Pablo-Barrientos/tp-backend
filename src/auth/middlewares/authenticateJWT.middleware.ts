import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthTokenPayload } from "../interfaces/auth_token_payload.interface";
import { AuthenticatedRequest } from "../interfaces/authenticated_request.interface";
import { MessageResponse } from "../responses/Message.response";

export function authenticateJWT(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Response | void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json(MessageResponse.Forbidden);
  }

  const token = authHeader.split(" ")[1];
  const authSecret = process.env.AUTH_SECRET;
  if (!authSecret) {
    return res.status(401).json(MessageResponse.Forbidden);
  }

  try {
    const jwtDecoded = jwt.verify(token, authSecret);
    if (!isAuthTokenPayload(jwtDecoded)) {
      return res.status(401).json(MessageResponse.Forbidden);
    }

    req.user = jwtDecoded;
    next();
  } catch {
    return res.status(401).json(MessageResponse.Forbidden);
  }
}
function isAuthTokenPayload(
  value: string | JwtPayload,
): value is AuthTokenPayload {
  return (
    typeof value !== "string" &&
    typeof value.id_user === "number"
  );
}
