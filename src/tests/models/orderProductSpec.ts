import { OrderProduct, OrderProductStore } from '../../models/orderProduct';
import { Order, OrderStore } from '../../models/order';
import { User, UserStore } from '../../models/user';
import { Product, ProductStore } from '../../models/product';

const orderProductStore = new OrderProductStore()
let orderProduct1: OrderProduct;
let orderProduct2: OrderProduct;

const orderStore = new OrderStore()
let order1: Order;
let order2: Order;

const userStore = new UserStore();
let user1: User;
let user2: User;

const productStore = new ProductStore();
let product1: Product;
let product2: Product;

describe("OrderProduct Model", () => {
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
        order1 = await orderStore.create({
            user_id: user1.id as number,
            status: 'pending'
        });
        order2 = await orderStore.create({
            user_id: user2.id as number,
            status: "completed"
        });
        product1 = await productStore.create({
            name: 'Monitor',
            price: 100,
            category: "pc accessories"
        });
        product2 = await productStore.create({
            name: 'Mouse',
            price: 2,
            category: "pc accessories"
        });
    });

    it('should have an index method', () => {
        expect(orderProductStore.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(orderProductStore.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(orderProductStore.create).toBeDefined();
    });

    it('should have an edit method', () => {
        expect(orderProductStore.edit).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(orderProductStore.delete).toBeDefined();
    });

    it('should have a deleteAll method', () => {
        expect(orderProductStore.deleteAll).toBeDefined();
    });

    it('create method should add an order product', async () => {
        orderProduct1 = await orderProductStore.create({
            order_id: order1.id as number,
            product_id: product1.id as number,
            quantity: 10
        });
        expect(parseInt(orderProduct1.order_id as unknown as string)).toEqual(order1.id as number);
        expect(parseInt(orderProduct1.product_id as unknown as string)).toEqual(product1.id as number);
        expect(orderProduct1.quantity).toEqual(10);

        orderProduct2 = await orderProductStore.create({
            order_id: order2.id as number,
            product_id: product2.id as number,
            quantity: 100
        });
        expect(parseInt(orderProduct2.order_id as unknown as string)).toEqual(order2.id as number);
        expect(parseInt(orderProduct2.product_id as unknown as string)).toEqual(product2.id as number);
        expect(orderProduct2.quantity).toEqual(100);
    });

    it('index method should return a list of order products', async () => {
        const result = await orderProductStore.index();

        expect(result.length).toEqual(2);

        expect(parseInt(result[0].order_id as unknown as string)).toEqual(order1.id as number);
        expect(parseInt(result[0].product_id as unknown as string)).toEqual(product1.id as number);
        expect(result[0].quantity).toEqual(10);

        expect(parseInt(result[1].order_id as unknown as string)).toEqual(order2.id as number);
        expect(parseInt(result[1].product_id as unknown as string)).toEqual(product2.id as number);
        expect(result[1].quantity).toEqual(100);
    });

    it('show method should return the correct order product', async () => {
        const result = await orderProductStore.show(orderProduct1.id as unknown as string);

        expect(parseInt(result.order_id as unknown as string)).toEqual(order1.id as number);
        expect(parseInt(result.product_id as unknown as string)).toEqual(product1.id as number);
        expect(result.quantity).toEqual(10);
    });

    it('delete method should remove the order product', async () => {
        await orderProductStore.delete(orderProduct1.id as unknown as string);
        const result = await orderProductStore.index();

        expect(result.length).toEqual(1);
        expect(parseInt(result[0].order_id as unknown as string)).toEqual(order2.id as number);
        expect(parseInt(result[0].product_id as unknown as string)).toEqual(product2.id as number);
        expect(result[0].quantity).toEqual(100);
    });

    it('deleteAll method should remove order products', async () => {
        await orderProductStore.deleteAll();
        const result = await orderProductStore.index();

        expect(result.length).toEqual(0);
    });

    afterAll(async () => {
        await orderProductStore.deleteAll();
        await orderStore.deleteAll();
        await userStore.deleteAll();
        await productStore.deleteAll();
    });
});