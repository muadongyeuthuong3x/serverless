"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const dbOperation_1 = require("./dbOperation");
class UserRepository extends dbOperation_1.DBOperation {
    constructor() {
        super();
    }
    CreateUserOperation({ email, password, salt, userType, phone }) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryString = "INSERT INTO users (phone,email, password, salt, user_type) VALUES ($1, $2, $3,$4,$5) RETURNING *";
            const values = [phone, email, password, salt, userType];
            const result = yield this.excuteQuery(queryString, values);
            if (result.rowCount > 0) {
                return result.rows[0];
            }
        });
    }
    findAccountByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryString = "SELECT * from users where email = $1";
            const values = [email];
            const result = yield this.excuteQuery(queryString, values);
            if (result.rowCount < 1) {
                throw new Error("user does not exits with provider email");
            }
            return result.rows[0];
        });
    }
    updateVerificationCode(userId, code, expiry) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryString = "UPDATE users SET verification_code =$1 , expiry = $2  WHERE user_id = $3 RETURNING *";
            const values = [code, expiry, userId];
            const result = yield this.excuteQuery(queryString, values);
            if (result.rowCount > 0) {
                return result.rows[0];
            }
        });
    }
    updateUser(user_id, firstName, lastName, userType) {
        return __awaiter(this, void 0, void 0, function* () {
            const values = [firstName, lastName, userType, user_id];
            console.log(values);
            const queryString = "UPDATE users SET first_name = $1, last_name= $2, user_type = $3  WHERE user_id=$4 RETURNING *";
            const result = yield this.excuteQuery(queryString, values);
            if (result.rowCount > 0) {
                return result.rows[0];
            }
            throw new Error("error while updateuser !");
        });
    }
    createProfile(user_id, { firstName, lastName, userType, address }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.updateUser(user_id, firstName, lastName, userType);
            const { addressLine1, addressLine2, city, postCode, country } = address;
            const values = [user_id, addressLine1, addressLine2, city, postCode, country];
            const queryString = "INSERT INTO address(user_id , address_line1 ,address_line2,city,post_code, country)  VALUES ($1,$2,$3,$4,$5,$6) RETURNING *";
            const result = yield this.excuteQuery(queryString, values);
            if (result.rowCount > 0) {
                return result.rows[0];
            }
            return true;
        });
    }
    getUserProfile(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const profileQuery = "SELECT first_name , last_name , email , phone , user_type, verified FROM users WHERE user_id=$1";
            const profileValue = [user_id];
            const result = yield this.excuteQuery(profileQuery, profileValue);
            if (result.rowCount < 1) {
                throw new Error("user profile no exits");
            }
            const userProfile = result.rows[0];
            const addQuery = "SELECT id ,address_line1 , address_line2, city,post_code,country FROM address WHERE user_id = $1";
            const valuesQuey = [user_id];
            const resultProfile = yield this.excuteQuery(addQuery, valuesQuey);
            if (result.rowCount > 0) {
                userProfile.address = resultProfile.rows;
            }
            return userProfile;
        });
    }
    updateProfile(user_id, { firstName, lastName, userType, address: { addressLine1, addressLine2, city, postCode, country, id } }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.updateUser(user_id, firstName, lastName, userType);
            const values = [addressLine1, addressLine2, city, postCode, country, id];
            const queryString = "UPDATE address SET address_line1 = $1 , address_line2 = $2, city = $3, post_code = $4, country = $5 WHERE id = $6  RETURNING *";
            const result = yield this.excuteQuery(queryString, values);
            if (result.rowCount < 1) {
                throw new Error("update user profile error");
            }
            return true;
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=userRepository.js.map