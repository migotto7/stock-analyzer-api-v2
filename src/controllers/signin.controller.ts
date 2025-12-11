import { type Request, type Response } from "express";
import { db } from "../database/client.ts";
import { users } from "../database/schema.ts";
import { eq } from "drizzle-orm";
import { hash } from 'argon2'
import jwt from 'jsonwebtoken'

export async function signInController(req: Request, res: Response) {   
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).send({
                message: "Name, Email and Password are required"
            })
        }

        const [alreadyHasUser] = await db
            .select({ id: users.id })
            .from(users)
            .where(eq(users.email, email))
            .limit(1)

        if (alreadyHasUser) {
            return res.status(400).send({
                "error": {
                    "email": ["This email address is already registered."]
                },
                message: "Validation Failed"
            })
        }

        const passwordHashed = await hash(password)

        const newUser = await db
            .insert(users)
            .values({ name: name, email: email, password: passwordHashed })
            .returning()

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET must be set.')
        }
        
        const newUserId = newUser[0].id

        const token = jwt.sign({ sub: newUserId }, process.env.JWT_SECRET)

        return res.status(201).send({ id: newUserId, token: token})
    } catch (err: any) {
        return res
            .status(500)
            .json({ error: err.message || "Internal server error" });
    }
}