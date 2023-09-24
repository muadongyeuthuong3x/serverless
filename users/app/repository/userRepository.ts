import { AddressModel, ProfileInput } from "app/models/AddressModel";
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
        const result = await this.excuteQuery(queryString, values)

        if (result.rowCount > 0) {
            return result.rows[0] as UserModel;
        }
    }

    async findAccountByEmail(email: string) {

        const queryString = "SELECT * from users where email = $1"
        const values = [email];
        const result = await this.excuteQuery(queryString, values);
        if (result.rowCount < 1) {
            throw new Error("user does not exits with provider email")
        }
        return result.rows[0] as UserModel;
    }


    async updateVerificationCode(userId: number, code: number, expiry: Date) {
        const queryString = "UPDATE users SET verification_code =$1 , expiry = $2  WHERE user_id = $3 RETURNING *"
        const values = [code, expiry, userId];
        const result = await this.excuteQuery(queryString, values)
        if (result.rowCount > 0) {
            return result.rows[0] as UserModel;
        }
    }

    async updateUser(
        user_id: number,
        firstName: string,
        lastName: string,
        userType: string,
    ) {
        const values = [firstName, lastName, userType, user_id];
        console.log(values)
        const queryString = "UPDATE users SET first_name = $1, last_name= $2, user_type = $3  WHERE user_id=$4 RETURNING *";
        const result = await this.excuteQuery(queryString, values)
        if (result.rowCount > 0) {
            return result.rows[0] as UserModel;
        }
        throw new Error("error while updateuser !")
    }

    async createProfile(
        user_id: number,
        {
            firstName,
            lastName,
            userType,
            address
        }: ProfileInput
    ) {
        await this.updateUser(user_id, firstName, lastName, userType);
        const { addressLine1, addressLine2, city, postCode, country } = address
        const values = [user_id, addressLine1, addressLine2, city, postCode, country];
        const queryString = "INSERT INTO address(user_id , address_line1 ,address_line2,city,post_code, country)  VALUES ($1,$2,$3,$4,$5,$6) RETURNING *";
        const result = await this.excuteQuery(queryString, values)
        if (result.rowCount > 0) {
            return result.rows[0] as UserModel;
        }
        return true;
    }

    async getUserProfile(user_id: number) {
        const profileQuery = "SELECT first_name , last_name , email , phone , user_type, verified FROM users WHERE user_id=$1";
        const profileValue = [user_id];
        const result = await this.excuteQuery(profileQuery, profileValue);
        if (result.rowCount < 1) {
            throw new Error("user profile no exits");
        }
        const userProfile = result.rows[0] as UserModel;
        const addQuery = "SELECT id ,address_line1 , address_line2, city,post_code,country FROM address WHERE user_id = $1";
        const valuesQuey = [user_id];
        const resultProfile = await this.excuteQuery(addQuery, valuesQuey);
        if (result.rowCount > 0) {
            userProfile.address = resultProfile.rows as AddressModel[];
        }
        return userProfile;
    }


    async updateProfile(user_id: number,
        {
            firstName,
            lastName,
            userType,
            address: { addressLine1, addressLine2, city, postCode, country, id }
        }: ProfileInput) {
        await this.updateUser(user_id, firstName, lastName, userType);
        const values = [addressLine1, addressLine2, city, postCode, country, id];
        const queryString = "UPDATE address SET address_line1 = $1 , address_line2 = $2, city = $3, post_code = $4, country = $5 WHERE id = $6  RETURNING *";
        const result = await this.excuteQuery(queryString, values)
        if (result.rowCount < 1) {
            throw new Error("update user profile error");
        }
        return true;
    }
}
