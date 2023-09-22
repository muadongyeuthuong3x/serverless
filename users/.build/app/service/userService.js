"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.UserService = void 0;
const reponse_1 = require("../utility/reponse");
const userRepository_1 = require("../repository/userRepository");
const tsyringe_1 = require("tsyringe");
const class_transformer_1 = require("class-transformer");
const Signup_1 = require("../models/dto/Signup");
const Login_1 = require("../models/dto/Login");
const errors_1 = require("../utility/errors");
const password_1 = require("../utility/password");
const notification_1 = require("../utility/notification");
let UserService = class UserService {
    constructor(repository) {
        this.repository = repository;
    }
    CreateUser(event) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bodyValue = event.body;
                const input = (0, class_transformer_1.plainToClass)(Signup_1.SignupInput, bodyValue);
                const error = yield (0, errors_1.AppValidationError)(input);
                if (error)
                    return (0, reponse_1.ErrorResponse)(404, error);
                const { email, phone, password } = input;
                const salt = yield (0, password_1.GetSalt)();
                const hashePassword = yield (0, password_1.GetHashedPassword)(password, salt);
                const data = yield this.repository.CreateUserOperation({
                    email,
                    phone,
                    password: hashePassword,
                    salt,
                    userType: "BUYER"
                });
                return (0, reponse_1.SuccessResponse)({ message: data });
            }
            catch (error) {
                return (0, reponse_1.ErrorResponse)(500, error);
            }
        });
    }
    UserLogin(event) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = (0, class_transformer_1.plainToClass)(Login_1.LoginInput, event.body);
                const error = yield (0, errors_1.AppValidationError)(input);
                if (error)
                    return (0, reponse_1.ErrorResponse)(404, error);
                const data = yield this.repository.findAccountByEmail(input.email);
                // check validator password 
                const verify = yield (0, password_1.ValidatePassword)(input.password, data.password, data.salt);
                if (!verify) {
                    throw new Error("Password no match");
                }
                const token = (0, password_1.GetToken)(data);
                return (0, reponse_1.SuccessResponse)({ token });
            }
            catch (error) {
                return (0, reponse_1.ErrorResponse)(500, error);
            }
        });
    }
    GetVerificationToken(event) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = event.headers.authorization;
                const payload = yield (0, password_1.VerifyToken)(token);
                if (payload) {
                    const { code, expiry } = (0, notification_1.GenerateAccessCode)();
                    yield this.repository.updateVerificationCode(payload.user_id, code, expiry);
                }
                return (0, reponse_1.SuccessResponse)({ message: "Verification code is sent to your register" });
            }
            catch (error) {
                return (0, reponse_1.ErrorResponse)(500, error);
            }
        });
    }
    VerifyUser(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = event.headers.authorization;
            const payload = yield (0, password_1.VerifyToken)(token);
            console.log(payload);
            if (payload) {
                const { code, expiry } = (0, notification_1.GenerateAccessCode)();
                console.log(code, expiry, payload.phone);
                const reponse = yield (0, notification_1.SendVerificationCode)(code, payload.phone);
            }
            return (0, reponse_1.SuccessResponse)({ message: "Verification code is sent to your register" });
        });
    }
    //User profile
    CreateProfile(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, reponse_1.SuccessResponse)({ message: "response from create profile" });
        });
    }
    EditProfile(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, reponse_1.SuccessResponse)({ message: "response from edit profile" });
        });
    }
    GetProfile(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, reponse_1.SuccessResponse)({ message: "response from get profile" });
        });
    }
    // Cart Section
    CreateCart(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, reponse_1.SuccessResponse)({ message: "response from create Cart" });
        });
    }
    EditCart(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, reponse_1.SuccessResponse)({ message: "response from edit Cart" });
        });
    }
    GetCart(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, reponse_1.SuccessResponse)({ message: "response from get Cart" });
        });
    }
    UpdateCart(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, reponse_1.SuccessResponse)({ message: "response from get Cart" });
        });
    }
    // payment Section
    CreatePaymentMethod(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, reponse_1.SuccessResponse)({ message: "response from create payment method" });
        });
    }
    GetPaymentMethod(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, reponse_1.SuccessResponse)({ message: "response from get payment method" });
        });
    }
    UpdatePaymentMethod(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, reponse_1.SuccessResponse)({ message: "response from update payment method" });
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [userRepository_1.UserRepository])
], UserService);
//# sourceMappingURL=userService.js.map