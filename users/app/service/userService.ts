import { APIGatewayProxyEventV2} from 'aws-lambda'
import { SuccessResponse , ErrorResponse}  from '../utility/reponse';
import { UserRepository } from '../repository/userRepository';
import { autoInjectable } from 'tsyringe';

@autoInjectable()

export class UserService {
    repository : UserRepository
    constructor(repository : UserRepository){
     this.repository = repository;
    }

    async CreateUser(event : APIGatewayProxyEventV2){
        await this.repository.CreateUserOperation()
        return SuccessResponse({ message: "response from create User"});
    }

    async UserLogin(event : APIGatewayProxyEventV2){
        return SuccessResponse({ message: "response from user login"});
    }

    async VerifyUser(event : APIGatewayProxyEventV2){
        return SuccessResponse({ message: "response from verify User"});
    }

    //User profile
    async CreateProfile(event : APIGatewayProxyEventV2){
        return SuccessResponse({ message: "response from create profile"});
    }

    async EditProfile(event : APIGatewayProxyEventV2){
        return SuccessResponse({ message: "response from edit profile"});
    }

    async GetProfile(event : APIGatewayProxyEventV2){
        return SuccessResponse({ message: "response from get profile"});
    }

    // Cart Section
    async CreateCart(event : APIGatewayProxyEventV2){
        return SuccessResponse({ message: "response from create Cart"});
    }

    async EditCart(event : APIGatewayProxyEventV2){
        return SuccessResponse({ message: "response from edit Cart"});
    }

    async GetCart(event : APIGatewayProxyEventV2){
        return SuccessResponse({ message: "response from get Cart"});
    }

    async UpdateCart(event : APIGatewayProxyEventV2){
        return SuccessResponse({ message: "response from get Cart"});
    }
  
    // payment Section

    async CreatePaymentMethod(event : APIGatewayProxyEventV2){
        return SuccessResponse({ message: "response from create payment method"});
    }

    async GetPaymentMethod(event : APIGatewayProxyEventV2){
        return SuccessResponse({ message: "response from get payment method"});
    }


    async UpdatePaymentMethod(event : APIGatewayProxyEventV2){
        return SuccessResponse({ message: "response from update payment method"});
    }
     
}