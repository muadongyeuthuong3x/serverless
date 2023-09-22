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
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=userRepository.js.map