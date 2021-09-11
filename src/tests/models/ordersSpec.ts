import { Order, OrderStore } from '../../models/orders';
import { User, UserStore } from '../../models/user';

const store = new OrderStore()
let order1: Order;
let order2: Order;

const userStore = new UserStore();
let user1: User;
let user2: User;

describe("Order Model", () => {
    beforeAll(async () => {
        user1 = await userStore.create({
            first_name: 'User',
            last_name: 'One',
            password: "pass1"
        });
        user2 = await userStore.create({
            first_name: 'User',
            last_name: 'Two',
            password: "pass2"
        });
    });

    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have a edit method', () => {
        expect(store.edit).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });

    it('create method should add an order', async () => {
        order1 = await store.create({
            user_id: user1.id as unknown as string,
            status: 'pending'
        });
        expect(order1.user_id).toEqual(user1.id as unknown as string);
        expect(order1.status).toEqual('pending');

        order2 = await store.create({
            user_id: user2.id as unknown as string,
            status: "completed"
        });
        expect(order2.user_id).toEqual(user2.id as unknown as string);
        expect(order2.status).toEqual('completed');
    });

    it('index method should return a list of orders', async () => {
        const result = await store.index();

        expect(result.length).toEqual(2);

        expect(result[0].user_id).toEqual(user1.id as unknown as string);
        expect(result[0].status).toEqual('pending');

        expect(result[1].user_id).toEqual(user2.id as unknown as string);
        expect(result[1].status).toEqual('completed');
    });

    it('show method should return the correct order', async () => {
        const result = await store.show("1");

        expect(result.user_id).toEqual(user1.id as unknown as string);
        expect(result.status).toEqual('pending');
    });

    it('delete method should remove the order', async () => {
        await store.delete(order1.id as unknown as string);
        const result = await store.index()

        expect(result.length).toEqual(1);
        expect(result[0].user_id).toEqual(user2.id as unknown as string);
        expect(result[0].status).toEqual('completed');
    });

    it('deleteAll method should remove orders', async () => {
        await store.deleteAll();
        const result = await store.index()

        expect(result.length).toEqual(0);
    });

    afterAll(async () => {
        await userStore.deleteAll();
    });
});