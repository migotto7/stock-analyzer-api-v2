import type { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'

type jwtPayload = {
    sub: string
}

declare global {
    namespace Express {
        interface Request {
            user?: jwtPayload
        }
    }
}

export function checkRequestJwt(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization

    if(!token) {
        return res.status(401).json({ error: 'No token provided' })
    }

    if(!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET must be set.')
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET) as jwtPayload
        req.user = payload
        next()
    } catch (err: any) {
        return res.status(401).json({ error: 'Invalid or expired token' })
    }
}
