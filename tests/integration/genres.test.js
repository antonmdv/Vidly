const request = require('supertest')
const mongoose = require('mongoose');
let server
const {Genre} = require('../../models/genre')

describe('/api/genres', () => {

    beforeEach(() => {
        server = require('../../index');
    })
    afterEach(async () => {
        server.close();
        await Genre.deleteMany({})
    })
    afterAll(async () => {
        await mongoose.disconnect();
    })

    describe('GET /', () => {
        it('return all genres', async () => {
            await Genre.collection.insertMany([
                {name: 'genre1'},
                {name: 'genre2'},
            ]);
            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
        })
    })
})