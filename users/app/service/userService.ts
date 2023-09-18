import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { SuccessResponse, ErrorResponse } from '../utility/reponse';
import { UserRepository } from '../repository/userRepository';
import { autoInjectable } from 'tsyringe';
import { plainToClass } from 'class-transformer';
import { SignupInput } from '../models/dto/Signup';
import { LoginInput } from '../models/dto/Login';
import { AppValidationError } from '../utility/errors';
import { GetHashedPassword, GetSalt, GetToken, ValidatePassword } from '../utility/password'


@autoInjectable()

export class UserService {
    repository: UserRepository
    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    async CreateUser(event: APIGatewayProxyEventV2) {
        try {
            const bodyValue: any = event.body;
            const input = plainToClass(SignupInput, bodyValue);
            const error = await AppValidationError(input)
            if (error) return ErrorResponse(404, error);
            const { email, phone, password } = input;
            const salt = await GetSalt();
            const hashePassword = await GetHashedPassword(password, salt);
            const data = await this.repository.CreateUserOperation({
                email,
                phone,
                password: hashePassword,
                salt,
                userType: "BUYER"
            })
            return SuccessResponse({ message: data });
        } catch (error) { 
            return ErrorResponse(500, error);
        }

    }

    async UserLogin(event: APIGatewayProxyEventV2) {
        try {
            const input = plainToClass(LoginInput, event.body);
          
            const error = await AppValidationError(input)
            if (error) return ErrorResponse(404, error);
            console.log(input , input.email)
            const data = await this.repository.findAccountByEmail(input.email);

            // check validator password 
            const verify = await ValidatePassword(input.password , data.password , data.salt);
            if(!verify){
             throw new Error("Password no match")
            }

            const token = GetToken(data)
            
            return SuccessResponse({ token });
        } catch (error) {
            return ErrorResponse(500, error);
        }
    }

    async VerifyUser(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: "response from verify User" });
    }

    //User profile
    async CreateProfile(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: "response from create profile" });
    }

    async EditProfile(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: "response from edit profile" });
    }

    async GetProfile(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: "response from get profile" });
    }

    // Cart Section
    async CreateCart(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: "response from create Cart" });
    }

    async EditCart(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: "response from edit Cart" });
    }

    async GetCart(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: "response from get Cart" });
    }

    async UpdateCart(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: "response from get Cart" });
    }

    // payment Section

    async CreatePaymentMethod(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: "response from create payment method" });
    }

    async GetPaymentMethod(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: "response from get payment method" });
    }


    async UpdatePaymentMethod(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: "response from update payment method" });
    }

}