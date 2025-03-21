type SuccessfulParams = Omit<ResponseInit, "jsonBody" | "body" | "headers"> & {
    /**
     * Data sended in jsonBody
     * @default undefined
     */
    data?: unknown;
    /**
     * Message sended in jsonBody
     * @default "Solicitud exitosa"
     */
    message?: string;
    /**
     * Extend the base body (data and message)
     * @default undefined
     */
    extendBody?: Record<string, unknown>;

    /**
     * Total of items
     * @default undefined
     */
    total?: number;
};

class CommonResponseClass {
    invalidId(): Response {
        return Response.json(
            { message: "El ID es invalido o no ha sido proporcionado" },
            { status: 400 },
        );
    }

    invalidBody(error?: unknown): Response {
        console.error(error);
        return Response.json(
            { message: "Error en la peticion, el body es invalido" },
            { status: 400 },
        );
    }

    /**
     * @default params {data = undefined, message = "Solicitud exitosa", status = 200, extendBody = undefined }
     */
    successful(params?: SuccessfulParams): Response {
        const { data, message, status, extendBody, total, ...rest } = {
            data: undefined,
            message: "Solicitud exitosa",
            status: 200,
            extendBody: undefined,
            total: undefined,
            ...params,
        };

        return Response.json(
            {
                response: {
                    data,
                    total,
                },
                message,
                ...(extendBody || {}),
            },
            {
                status,
                headers: {
                    "Cache-Control": "no-store",
                },
                ...rest,
            },
        );
    }

    unauthorized(): Response {
        return Response.json(
            {
                message:
                    "Error de autenticación: no hay información del usuario",
            },
            { status: 401 },
        );
    }

    forbidden(): Response {
        return Response.json(
            { message: "Error de autorización: permisos insuficientes" },
            { status: 403 },
        );
    }

    badRequest(message: string): Response {
        return Response.json({ message }, { status: 400 });
    }

    notFound(message = "No encontrado"): Response {
        return Response.json({ message }, { status: 404 });
    }

    serverError(): Response {
        return Response.json(
            { message: "Error interno del servidor" },
            { status: 500 },
        );
    }
}

export const CommonResponse = new CommonResponseClass();
