import { json } from '@sveltejs/kit';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const handlePrismaError = (e: unknown) => {
    if (e instanceof PrismaClientKnownRequestError) {
        return {
            code: e.code,
            message: e.message
        };
    } else {
        return {
            code: 'UNKNOWN_ERROR',
            message: 'An unknown error occurred'
        };
    }
}

export const prismaErrorResponse = (e: unknown) => {
    const { code, message } = handlePrismaError(e);
    return json({ code, message }, { status: 500 });
};

export const requiredFieldErrorResponse = (field: string) => {
    return json(
        {
            code: 'MISSING_FIELD',
            message: `${field} is required`
        },
        {
            status: 400
        }
    );
}