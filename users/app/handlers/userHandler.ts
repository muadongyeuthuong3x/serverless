import { APIGatewayProxyEventV2 } from 'aws-lambda'
import {container} from "tsyringe";
import middy from '@middy/core'
import { UserService } from '../service/userService'
import { ErrorResponse } from '../utility/reponse';
import jsonBodyParser from '@middy/http-json-body-parser'
const service = container.resolve(UserService);


export const Signup = middy((event: APIGatewayProxyEventV2) => {
    return service.CreateUser(event)
}).use(jsonBodyParser())


export const Login = middy ((event: APIGatewayProxyEventV2) => {
    return service.UserLogin(event)
}).use(jsonBodyParser())

export const Verify = async (event: APIGatewayProxyEventV2) => {
    const httpMethod = event.requestContext.http.method.toLowerCase();
    if(httpMethod === "post"){
        return  service.GetVerificationToken(event);
    }else if(httpMethod === "get") {
        return service.VerifyUser(event);
    } else {
        return ErrorResponse(404, "requested method");
    }
  
    
}


export const Profile = middy((event: APIGatewayProxyEventV2) => {
    const httpMethod = event.requestContext.http.method.toLowerCase();
    if (httpMethod === "post") {
        return service.CreateProfile(event);
    } else if (httpMethod === "put") {
        return service.EditProfile(event);
    } else if (httpMethod === "get") {
        return service.GetProfile(event)
    } else {
        return ErrorResponse(404, "requested method");
    }
}).use(jsonBodyParser())

export const Cart = async (event: APIGatewayProxyEventV2) => {
    const httpMethod = event.requestContext.http.method.toLowerCase();;
    if (httpMethod === "post") {
        return service.CreateCart(event);
    } else if (httpMethod === "put") {
        return service.UpdateCart(event);
    } else if (httpMethod === "get") {
        return service.GetCart(event)
    } else {
        return ErrorResponse(404, "requested method");
    }
}


export const Payment = async (event: APIGatewayProxyEventV2) => {
    const httpMethod = event.requestContext.http.method.toLowerCase();;
    if (httpMethod === "post") {
        return service.CreatePaymentMethod(event);
    } else if (httpMethod === "put") {
        return service.UpdatePaymentMethod(event);
    } else if (httpMethod === "get") {
        return service.GetPaymentMethod(event)
    } else {
        return ErrorResponse(404, "requested method");
    }
}



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