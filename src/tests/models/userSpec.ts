import { User, UserStore } from '../../models/user';

const store = new UserStore();
let user1: User;
let user2: User;

describe("User Model", () => {
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

    it('should have an authenticate method', () => {
        expect(store.authenticate).toBeDefined();
    });

    it('create method should add a user', async () => {
        user1 = await store.create({
            first_name: 'User',
            last_name: 'One',
            password: "pass1"
        });
        expect(user1.first_name).toEqual('User');
        expect(user1.last_name).toEqual('One');

        user2 = await store.create({
            first_name: 'User',
            last_name: 'Two',
            password: "pass2"
        });
        expect(user2.first_name).toEqual('User');
        expect(user2.last_name).toEqual('Two');
    });

    it('edit method should edit an user', async () => {
        const id = user2.id;
        user2 = await store.edit({
            id: id,
            first_name: "User",
            last_name: "EditedTwo",
            password: "pass2"
        });

        expect(user2.first_name).toEqual('User');
        expect(user2.last_name).toEqual('EditedTwo');
    });

    it('index method should return a list of users', async () => {
        const result = await store.index();

        expect(result.length).toEqual(2);

        expect(result[0].first_name).toEqual('User');
        expect(result[0].last_name).toEqual('One');

        expect(result[1].first_name).toEqual('User');
        expect(result[1].last_name).toEqual('EditedTwo');
    });

    it('show method should return the correct user', async () => {
        const result = await store.show(user1.id as unknown as string);

        expect(result.first_name).toEqual('User');
        expect(result.last_name).toEqual('One');
    });

    it('authenticate method should validate the user', async () => {
        const result = await store.authenticate('User', 'EditedTwo', 'pass2');

        expect(result).not.toBeNull();
        if (result) {
            expect(result.first_name).toEqual('User');
            expect(result.last_name).toEqual('EditedTwo');
        }
    });

    it('authenticate method should reject the user', async () => {
        const result = await store.authenticate('User', 'EditedTwo', 'invalidpass');

        expect(result).toBeNull();
    });

    it('delete method should remove the user', async () => {
        await store.delete(user1.id as unknown as string);
        const result = await store.index();

        expect(result.length).toEqual(1);
        expect(result[0].first_name).toEqual('User');
        expect(result[0].last_name).toEqual('EditedTwo');
    });

    it('deleteAll method should remove all user', async () => {
        await store.deleteAll();
        const result = await store.index();

        expect(result.length).toEqual(0);
    });
});