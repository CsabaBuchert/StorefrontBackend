import { Product, ProductStore } from '../../models/product';

const store = new ProductStore()
let product1: Product;
let product2: Product;

describe("Product Model", () => {
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

    it('create method should add a product', async () => {
        product1 = await store.create({
            name: 'Monitor',
            price: 100,
            category: "pc accessories"
        });
        expect(product1.name).toEqual('Monitor');
        expect(product1.price).toEqual(100);
        expect(product1.category).toEqual('pc accessories');

        product2 = await store.create({
            name: 'Mouse',
            price: 2,
            category: "pc accessories"
        });
        expect(product2.name).toEqual('Mouse');
        expect(product2.price).toEqual(2);
        expect(product2.category).toEqual('pc accessories');
    });

    it('index method should return a list of products', async () => {
        const result = await store.index();

        expect(result.length).toEqual(2);

        expect(result[0].name).toEqual('Monitor');
        expect(result[0].price).toEqual(100);
        expect(result[0].category).toEqual('pc accessories');

        expect(result[1].name).toEqual('Mouse');
        expect(result[1].price).toEqual(2);
        expect(result[1].category).toEqual('pc accessories');
    });

    it('show method should return the correct product', async () => {
        const result = await store.show(product1.id as unknown as string);

        expect(result.name).toEqual('Monitor');
        expect(result.price).toEqual(100);
        expect(result.category).toEqual('pc accessories');
    });

    it('delete method should remove the product', async () => {
        await store.delete(product1.id as unknown as string);
        const result = await store.index();

        expect(result.length).toEqual(1);
        expect(result[0].name).toEqual('Mouse');
        expect(result[0].price).toEqual(2);
        expect(result[0].category).toEqual('pc accessories');
    });

    it('deleteAll method should remove products', async () => {
        await store.deleteAll();
        const result = await store.index();

        expect(result.length).toEqual(0);
    });
});