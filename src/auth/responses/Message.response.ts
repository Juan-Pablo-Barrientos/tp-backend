export class MessageResponse<T = unknown>{
    constructor(public success: boolean, public msg: string, public data?: T) {}

    static get Ok(): MessageResponse<null> {
        return new MessageResponse(true, "OK", null);
    }

    static get Forbidden(): MessageResponse<null> {
        return new MessageResponse(false, "Forbidden", null);
    }
}