import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";


interface ApiGetwayStackProps {
    productService : IFunction;
}

export class ApiGetwaySTack extends Construct{
    constructor(scope: Construct, id: string, props: ApiGetwayStackProps) {
        super(scope, id);
    }


    addResource(serviceName : string , handler : IFunction){
        const apgw = new LambdaRestApi(this , `${serviceName}-ApiGtw` , {
            restApiName :  `${serviceName}-ApiGtw`,
            handler,
            proxy : false
        })

        // prodcut
        const productResuorce = apgw.root.addResource("product");
        productResuorce.addMethod("GET")
        productResuorce.addMethod("POST")

        const productIdResuorce = productResuorce.addResource("${id}");
        productIdResuorce.addMethod("GET")
        productIdResuorce.addMethod("DELETE")
        productIdResuorce.addMethod("PUT")

        // category
        const categoryResuorce = apgw.root.addResource("category");
        productResuorce.addMethod("GET")
        productResuorce.addMethod("POST")

        const categoryIdResuorce = categoryResuorce.addResource("${id}");
        categoryIdResuorce.addMethod("GET")
        categoryIdResuorce.addMethod("DELETE")
        categoryIdResuorce.addMethod("PUT")
        
        // deals
        const dealsResuorce = apgw.root.addResource("deals");
        dealsResuorce.addMethod("GET")
        dealsResuorce.addMethod("POST")

        const dealsResuorceIdResuorce = dealsResuorce.addResource("${id}");
        dealsResuorceIdResuorce.addMethod("GET")
        dealsResuorceIdResuorce.addMethod("DELETE")
        dealsResuorceIdResuorce.addMethod("PUT")
    }

   
}