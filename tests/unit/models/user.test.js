const {User} = require('../../../models/user')
const jwt = require('jsonwebtoken')
const config = require('config')
const mongoose = require('mongoose')

describe('user.generateAuthToken', () => {
    it('Should generate JWT token', async () => {
        const payload = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            isAdmin: true
        }
        const user = new User(payload);
        const token = user.generateAuthToken();
        const decodedToken = jwt.decode(token, config.get('jwtPrivateKey'));

        expect(decodedToken).toMatchObject(payload);

    })
})