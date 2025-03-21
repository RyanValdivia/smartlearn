import { CommonResponse } from "@/utils/common-response";

export class ValidationError extends Error {
    constructor(message: string) {
        super(`Hubo un error en la validación de los datos: ${message}`);
    }
}

export class StudentNotFoundError extends Error {
    constructor() {
        super("Estudiante no encontrado");
    }
}

export class UserAlreadyExistsError extends Error {
    constructor() {
        super("El DNI ya está registrado");
    }
}

export function handleError(error: unknown): Response {
    if (error instanceof ValidationError) {
        return CommonResponse.badRequest(error.message);
    }

    if (error instanceof StudentNotFoundError) {
        return CommonResponse.notFound(error.message);
    }

    if (error instanceof UserAlreadyExistsError) {
        return CommonResponse.badRequest(error.message);
    }

    return CommonResponse.serverError();
}
