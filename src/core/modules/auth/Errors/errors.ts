import { CommonResponse } from "@/utils/common-response";

export class UserNotFoundError extends Error {
    constructor() {
        super("Usuario no encontrado con DNI");
    }
}

export class InvalidCredentialsError extends Error {
    constructor() {
        super("Credenciales inválidas");
    }
}

export class ValidationError extends Error {
    constructor(message: string) {
        super(`Hubo un error en la validación de los datos: ${message}`);
    }
}

export function handleError(error: unknown): Response {
    if (error instanceof ValidationError) {
        return CommonResponse.badRequest(error.message);
    }

    if (error instanceof UserNotFoundError) {
        return CommonResponse.notFound(error.message);
    }

    if (error instanceof InvalidCredentialsError) {
        return CommonResponse.unauthorized();
    }

    return CommonResponse.serverError();
}
