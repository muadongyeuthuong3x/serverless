import { UserModel } from "../models/UserModel";
import { DBClient } from "../utility/databaseClient";
import { DBOperation } from "./dbOperation";

export class UserRepository extends DBOperation {
    constructor() {
     super();
    }

    async CreateUserOperation({ email, password, salt, userType, phone }: UserModel) {
        const queryString = "INSERT INTO users (phone,email, password, salt, user_type) VALUES ($1, $2, $3,$4,$5) RETURNING *"
        const values = [phone, email, password, salt, userType];
        const result = await this.excuteQuery(queryString , values)

        if (result.rowCount > 0) {
            return result.rows[0] as UserModel;
        }
    }

    async findAccountByEmail(email : string) {
       
        const queryString = "SELECT * from users where email = $1"
        const values = [email];
        const result = await this.excuteQuery(queryString, values);
        if (result.rowCount < 1) {
            throw new Error("user does not exits with provider email")
        }
        return result.rows[0] as UserModel;
    }


    async updateVerificationCode(userId : string , code : number , expiry : Date) {
        const queryString = "UPDATE users SET verification_code =$1 , expiry = $2  WHERE user_id = $3 RETURNING *"
        const values = [code, expiry, userId];
        const result = await this.excuteQuery(queryString , values)
        if (result.rowCount > 0) {
            return result.rows[0] as UserModel;
        }
    }
}