import { test, expect } from 'vitest'
import request from 'supertest'
import app from '../app.ts'
import { object } from 'zod'

test('get stock by ticker', async () => {
    const ticker = "PETR4"
    const response = await request(app).get(`/stock/${ticker}`)

    expect(response.status).toEqual(200)
})

test('error when pass a invalid ticker', async () => {
    const ticker = "w2345"
    const response = await request(app).get(`/stock/${ticker}`)

    expect(response.status).toEqual(500)
})