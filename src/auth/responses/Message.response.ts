export class MessageResponse<T = unknown>{
    constructor(public error: boolean, public msg: string, public data?: T) {}

    static Ok<T>(data: T): MessageResponse<T> {
        return new MessageResponse(false, "OK", data);
    }

    static Error(errorMsg: string): MessageResponse<null> {
        return new MessageResponse(true, errorMsg, null);
    }

    static get Forbidden(): MessageResponse<null> {
        return new MessageResponse(true, "Forbidden", null);
    }
}