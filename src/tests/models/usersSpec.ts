import { User, UserStore } from '../../models/user';

const store = new UserStore()

describe("User Model", () => {
    beforeAll(() => {

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

    it('should have an authenticate method', () => {
        expect(store.authenticate).toBeDefined();
    });

    it('create method should add a user', async () => {
        const result1 = await store.create({
            first_name: 'User',
            last_name: 'One',
            password: "pass1"
        });
        expect(result1.id).toEqual(1);
        expect(result1.first_name).toEqual('User');
        expect(result1.last_name).toEqual('One');

        const result2 = await store.create({
            first_name: 'User',
            last_name: 'Two',
            password: "pass2"
        });
        expect(result2.id).toEqual(2);
        expect(result2.first_name).toEqual('User');
        expect(result2.last_name).toEqual('Two');
    });

    it('index method should return a list of users', async () => {
        const result = await store.index();

        expect(result.length).toEqual(2);

        expect(result[0].id).toEqual(1);
        expect(result[0].first_name).toEqual('User');
        expect(result[0].last_name).toEqual('One');

        expect(result[1].id).toEqual(2);
        expect(result[1].first_name).toEqual('User');
        expect(result[1].last_name).toEqual('Two');
    });

    it('show method should return the correct user', async () => {
        const result = await store.show("1");

        expect(result.id).toEqual(1);
        expect(result.first_name).toEqual('User');
        expect(result.last_name).toEqual('One');
    });

    it('delete method should remove the user', async () => {
        await store.delete("1");
        const result = await store.index();

        expect(result.length).toEqual(1);
        expect(result[0].id).toEqual(2);
        expect(result[0].first_name).toEqual('User');
        expect(result[0].last_name).toEqual('Two');
    });

    it('authenticate method should validate the user', async () => {
        const result = await store.authenticate('User', 'Two', 'pass2');

        expect(result).not.toBeNull();
        if (result) {
            expect(result.id).toEqual(2);
            expect(result.first_name).toEqual('User');
            expect(result.last_name).toEqual('Two');
        }
    });

    it('authenticate method should reject the user', async () => {
        const result = await store.authenticate('User', 'Two', 'invalidpass');

        expect(result).toBeNull();
    });
});