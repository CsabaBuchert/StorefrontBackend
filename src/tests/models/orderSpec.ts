import { Order, OrderStore } from '../../models/order';
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
            user_name: 'UserOne',
            first_name: 'User',
            last_name: 'One',
            password: "pass1"
        });
        user2 = await userStore.create({
            user_name: 'UserTwo',
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

    it('should have an edit method', () => {
        expect(store.edit).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });

    it('create method should add an order', async () => {
        order1 = await store.create({
            user_id: user1.id as number,
            status: 'pending'
        });

        // ToDo: I don't understand why necessary this "hack": user_id type is number, but typeof says is string...
        expect(parseInt(order1.user_id as unknown as string)).toEqual(user1.id as number);
        expect(order1.status).toEqual('pending');

        order2 = await store.create({
            user_id: user2.id as number,
            status: "completed"
        });
        expect(parseInt(order2.user_id as unknown as string)).toEqual(user2.id as number);
        expect(order2.status).toEqual('completed');
    });

    it('edit method should edit an order', async () => {
        const id = order2.id;
        order2 = await store.edit({
            id: id,
            user_id: user2.id as number,
            status: 'closed'
        });

        expect(parseInt(order2.user_id as unknown as string)).toEqual(user2.id as number);
        expect(order2.status).toEqual('closed');
    });

    it('index method should return a list of orders', async () => {
        const result = await store.index();

        expect(result.length).toEqual(2);

        expect(parseInt(result[0].user_id as unknown as string)).toEqual(user1.id as number);
        expect(result[0].status).toEqual('pending');

        expect(parseInt(result[1].user_id as unknown as string)).toEqual(user2.id as number);
        expect(result[1].status).toEqual('closed');
    });

    it('show method should return the correct order', async () => {
        const result = await store.show(order1.id as unknown as string);

        expect(parseInt(result.user_id as unknown as string)).toEqual(user1.id as number);
        expect(result.status).toEqual('pending');
    });

    it('delete method should remove the order', async () => {
        await store.delete(order1.id as unknown as string);
        const result = await store.index()

        expect(result.length).toEqual(1);
        expect(parseInt(result[0].user_id as unknown as string)).toEqual(user2.id as number);
        expect(result[0].status).toEqual('closed');
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