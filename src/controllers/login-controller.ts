import { type Request, type Response } from "express";
import { db } from "../database/client.ts";
import { users } from "../database/schema.ts";
import { eq } from "drizzle-orm";
import { verify } from "argon2";
import jwt from 'jsonwebtoken'

export async function loginController(req: Request, res: Response) {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).send({
                message: "Email and Password are required"
            })
        }

        const [user] = await db
            .select({ id: users.id, name: users.name, email: users.email, password: users.password })
            .from(users)
            .where(eq(users.email, email))
            .limit(1)

        if (!user) {
            return res.status(400).send({
                message: "Invalid Credentials"
            })
        }

        const doesPasswordMatch = await verify(user.password, password)

        if (!doesPasswordMatch) {
            return res.status(400).send({ message: 'Invalid Credentials' })
        }

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET must be set.')
        }

        const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET)

        return res.status(200).send({ token })
    } catch (err: any) {
        return res
            .status(500)
            .json({ error: err.message || "Internal server error" });
    }
}