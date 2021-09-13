import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import { User } from '../../models/user';
import StoreFrontServer from '../../server/storefrontServer';


const server = new StoreFrontServer(3000);
const request = supertest(server.app);

describe('Test users endpoints', () => {
    var token: string;
    var user: User;

    it('create endpoint should create a user', async () => {
        const response = await request.post('/store_front/users').send({
            user_name: 'UserOne',
            first_name: 'User',
            last_name: 'One',
            password: 'pass1'
        });
        token = response.body as string;
        user = jwt.decode(token) as User;
        expect(user.user_name).toEqual('UserOne');
        expect(user.first_name).toEqual('User');
        expect(user.last_name).toEqual('One');
    });

    it('show endpoint should return the user', async () => {
        const response = await request.get('/store_front/users/:id').send({
            id: user.id
        }).set('Authorization', token);
        expect(response.body.user_name).toEqual('UserOne');
        expect(response.body.first_name).toEqual('User');
        expect(response.body.last_name).toEqual('One');
    });

    it('index endpoint should return all of the users', async () => {
        const response = await request.get('/store_front/users').set('Authorization', token);
        expect(response.body[0].user_name).toEqual('UserOne');
        expect(response.body[0].first_name).toEqual('User');
        expect(response.body[0].last_name).toEqual('One');
    });

    it('authenticate endpoint should login the users', async () => {
        const response = await request.get('/store_front/authenticate').send({
            user_name: 'UserOne',
            password: 'pass1'
        });
        const loggedInUser = jwt.decode(token) as User;
        expect(loggedInUser.user_name).toEqual('UserOne');
        expect(loggedInUser.first_name).toEqual('User');
        expect(loggedInUser.last_name).toEqual('One');
    });

    it('authenticate endpoint should reject the wrong login', async () => {
        const response = await request.get('/store_front/authenticate').send({
            user_name: 'UserOne',
            password: 'wrong pass'
        });

        expect(response.statusCode).toEqual(400);
    });

    afterAll(async () => {
        await request.delete('/users').send({
            id: user.id
        }).set('Authorization', token);
    });
});