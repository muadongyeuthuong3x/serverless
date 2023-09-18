import { UserModel } from "../models/UserModel";
import { DBClient } from "../utility/databaseClient";

export class UserRepository {
    constructor() {

    }

    async CreateUserOperation({ email, password, salt, userType, phone }: UserModel) {
        const client = DBClient();
        await client.connect();
        const queryString = "INSERT INTO users (phone,email, password, salt, user_type) VALUES ($1, $2, $3,$4,$5) RETURNING *"
        const values = [phone, email, password, salt, userType];
        const result = await client.query(queryString, values);
        await client.end();
        if (result.rowCount > 0) {
            return result.rows[0] as UserModel;
        }
    }

    async findAccountByEmail(email : string) {
        const client = DBClient();
        await client.connect();
        const queryString = "SELECT * from users where email = $1"
        const values = [email];
        const result = await client.query(queryString, values);
        if (result.rowCount < 1) {
            throw new Error("user does not exits with provider email")
        }
        return result.rows[0] as UserModel;
    }

}