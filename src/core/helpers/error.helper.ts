import { MessageResponse } from "../../auth/responses/Message.response";

export class ErrorHelper {
  static Handle(error: unknown) {
    return MessageResponse.Error(
      error instanceof Error ? error.message : String(error),
    );
  }
}
