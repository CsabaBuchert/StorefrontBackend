import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import { Product } from '../../models/product';
import { User } from '../../models/user';
import StoreFrontServer from '../../server/storefrontServer';


const server = new StoreFrontServer(3000);
const request = supertest(server.app);

describe('Test products endpoints', () => {
    var user: User;
    var token: string;
    var product: Product;

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

    it('create endpoint should create an product', async () => {
        const response = await request.post('/store_front/products').send({
            name: 'Product One',
            price: 10,
            category: 'sample'
        }).set('Authorization', token);
        product = response.body as Product;
        expect(product.name).toEqual('Product One');
        expect(product.price).toEqual(10);
        expect(product.category).toEqual('sample');
    });

    it('show endpoint should return the product', async () => {
        const response = await request.get('/store_front/products/:id').send({
            id: product.id
        }).set('Authorization', token);
        expect(response.body.name).toEqual('Product One');
        expect(response.body.price).toEqual(10);
        expect(response.body.category).toEqual('sample');
    });

    it('index endpoint should return all of the products', async () => {
        const response = await request.get('/store_front/products').set('Authorization', token);
        expect(response.body[0].name).toEqual('Product One');
        expect(response.body[0].price).toEqual(10);
        expect(response.body[0].category).toEqual('sample');
    });

    afterAll(async () => {
        await request.delete('/products').send({
            id: product.id
        }).set('Authorization', token);
        await request.delete('/users').send({
            id: user.id
        }).set('Authorization', token);
    });
});