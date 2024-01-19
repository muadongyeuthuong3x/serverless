// lambda handler 

import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import {ErrorResponse} from "./utility/response";

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {


    const isRoot = event.pathParameters === null;

    switch (event.httpMethod.toLowerCase()) {
        case "post":
            if (isRoot) {

            }
            break;
        case "get":

        case "put":
            if (!isRoot) {

            }
        case "delete":
            if (!isRoot) {

            }
    }
    
    return ErrorResponse(4)
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "hello from prodcut",
            path: `${event.path} , ${event.pathParameters}`
        })
    }
}