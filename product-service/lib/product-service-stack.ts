import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ServiceStack } from './service_stack';
import { ApiGetwaySTack } from './api_gateway_stack';


export class ProductServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
       // api getway
       const Bucket = '';
       const  { productService } = new ServiceStack(this,"ProductService" , {
        
       })
       new ApiGetwaySTack(this, "ProductApiGetway", {
        productService
       })
  }
}
