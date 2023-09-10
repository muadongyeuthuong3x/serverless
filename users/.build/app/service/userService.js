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
let UserService = class UserService {
    constructor(repository) {
        this.repository = repository;
    }
    CreateUser(event) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.CreateUserOperation();
            return (0, reponse_1.SuccessResponse)({ message: "response from create User" });
        });
    }
    UserLogin(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, reponse_1.SuccessResponse)({ message: "response from user login" });
        });
    }
    VerifyUser(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, reponse_1.SuccessResponse)({ message: "response from verify User" });
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