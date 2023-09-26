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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = exports.Cart = exports.Profile = exports.Verify = exports.Login = exports.Signup = void 0;
const tsyringe_1 = require("tsyringe");
const core_1 = __importDefault(require("@middy/core"));
const userService_1 = require("../service/userService");
const reponse_1 = require("../utility/reponse");
const http_json_body_parser_1 = __importDefault(require("@middy/http-json-body-parser"));
const service = tsyringe_1.container.resolve(userService_1.UserService);
exports.Signup = (0, core_1.default)((event) => {
    return service.CreateUser(event);
}).use((0, http_json_body_parser_1.default)());
exports.Login = (0, core_1.default)((event) => {
    return service.UserLogin(event);
}).use((0, http_json_body_parser_1.default)());
const Verify = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const httpMethod = event.requestContext.http.method.toLowerCase();
    if (httpMethod === "post") {
        return service.GetVerificationToken(event);
    }
    else if (httpMethod === "get") {
        return service.VerifyUser(event);
    }
    else {
        return (0, reponse_1.ErrorResponse)(404, "requested method");
    }
});
exports.Verify = Verify;
exports.Profile = (0, core_1.default)((event) => {
    const httpMethod = event.requestContext.http.method.toLowerCase();
    if (httpMethod === "post") {
        return service.CreateProfile(event);
    }
    else if (httpMethod === "put") {
        return service.EditProfile(event);
    }
    else if (httpMethod === "get") {
        return service.GetProfile(event);
    }
    else {
        return service.ResponseWithError(event);
    }
}).use((0, http_json_body_parser_1.default)());
const Cart = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const httpMethod = event.requestContext.http.method.toLowerCase();
    ;
    if (httpMethod === "post") {
        return service.CreateCart(event);
    }
    else if (httpMethod === "put") {
        return service.UpdateCart(event);
    }
    else if (httpMethod === "get") {
        return service.GetCart(event);
    }
    else {
        return (0, reponse_1.ErrorResponse)(404, "requested method");
    }
});
exports.Cart = Cart;
const Payment = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const httpMethod = event.requestContext.http.method.toLowerCase();
    ;
    if (httpMethod === "post") {
        return service.CreatePaymentMethod(event);
    }
    else if (httpMethod === "put") {
        return service.UpdatePaymentMethod(event);
    }
    else if (httpMethod === "get") {
        return service.GetPaymentMethod(event);
    }
    else {
        return (0, reponse_1.ErrorResponse)(404, "requested method");
    }
});
exports.Payment = Payment;
// {
//     "firstName" : "nguyen",
//     "lastName" : "cuong",
//     "userType" : "SELLER",
//     "address" : {
//         "addressLine1" : "Thai Binh",
//         "addressLine2" : "Ha Noi",
//         "city" : "Thai Binh",
//         "postCode" :"10785",
//         "country" : "Viet Nam"
//     }
// }
// {
//     "email":"cuong22021@gmail.com",
//     "password": "12345678Aa",
//     "phone": "+84383387358"
// }
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImN1b25nMjIwMjFAZ21haWwuY29tIiwidXNlcl9pZCI6IjEiLCJwaG9uZSI6Iis4NDM4MzM4NzM1OCIsImlhdCI6MTY5NTYyOTk1NSwiZXhwIjoxNjk2NDkzOTU1fQ.l5mNkQwsWjFbXeOF902xM5CD3U8hbnrzIL9vb0Fj2wM
//# sourceMappingURL=userHandler.js.map