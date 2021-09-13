import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import { Order } from '../../models/order';
import { User } from '../../models/user';
import StoreFrontServer from '../../server/storefrontServer';


const server = new StoreFrontServer(3000);
const request = supertest(server.app);

describe('Test orders endpoints', () => {
    var user: User;
    var token: string;
    var order: Order;

    beforeAll(async () => {
        const response = await request.post('/store_front/users').send({
            user_name: 'UserOne',
            first_name: 'User',
            last_name: 'One',
            password: 'pass1'
        });
        token = response.body as string;
        user = jwt.decode(token) as User;
    })

    it('create endpoint should create an order', async () => {
        const response = await request.post('/store_front/orders').send({
            user_id: user.id,
            status: 'new'
        }).set('Authorization', token);
        token = response.body as string;
        order = jwt.decode(token) as Order;
        expect(parseInt(order.user_id as unknown as string)).toEqual(user.id as number);
        expect(order.status).toEqual('new');
    });

    it('show endpoint should return the order', async () => {
        const response = await request.get('/store_front/orders/:id').send({
            id: order.id
        }).set('Authorization', token);
        expect(parseInt(response.body.user_id as unknown as string)).toEqual(user.id as number);
        expect(response.body.status).toEqual('new');
    });

    it('index endpoint should return all of the orders', async () => {
        const response = await request.get('/store_front/orders').set('Authorization', token);
        expect(parseInt(response.body[0].user_id as unknown as string)).toEqual(user.id as number);
        expect(response.body[0].status).toEqual('new');
    });

    afterAll(async () => {
        await request.delete('/orders').send({
            id: order.id
        }).set('Authorization', token);
        await request.delete('/users').send({
            id: user.id
        }).set('Authorization', token);
    });
});