import { db } from './client.ts'
import { users, userFavorites } from './schema.ts'
import { fakerPT_BR as faker } from '@faker-js/faker'
import { hash } from 'argon2'

async function seed() {
    const passwordHash = await hash('123456')

    const usersInsert = await db.insert(users).values([
        {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: passwordHash
        },
        {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: passwordHash
        },
        {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: passwordHash
        }
    ]).returning()

    const userFavoritesInsert = await db.insert(userFavorites).values([
        {
            userId: usersInsert[0].id,
            ticker: "bbdc4"
        },
        {
            userId: usersInsert[0].id,
            ticker: "bbas3"
        },
        {
            userId: usersInsert[0].id,
            ticker: "petr4"
        }
    ])
}

seed()