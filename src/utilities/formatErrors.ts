export interface IError {
    message: string
    status: number | null
    field: string | null
}

export const formatErrors = (message: string, status: number | null = null, field: string | null = null): IError[] => {
    const formatedError: IError[] = [{
        message,
        status,
        field,
    }]
    return formatedError
}