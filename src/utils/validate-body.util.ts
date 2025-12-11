import { ZodType } from "zod";
import { type Request, type Response, type NextFunction } from "express";

export function validateBody(schema: ZodType) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body)

        if(!result.success) {
            return res.status(400).json({
                error: result.error
            })
        }

        req.body = result.data
        next()
    }
}