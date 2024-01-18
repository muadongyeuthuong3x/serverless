import { LambdaIntegration, LambdaRestApi, RestApi } from "aws-cdk-lib/aws-apigateway";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { aws_apigateway } from "aws-cdk-lib";
import { Construct  } from "constructs";


interface ApiGetwayStackProps {
    productService: IFunction;
    categoryService: IFunction;
    detailService: IFunction;
}

interface ResoureceType {
    name: string;
    methods: string[];
    child?: ResoureceType;
}

export class ApiGetwaySTack extends Construct {
    constructor(scope: Construct, id: string, props: ApiGetwayStackProps) {
        super(scope, id);
        this.addResource("product", props);
    }


    addResource(serviceName: string, { productService, categoryService, detailService }: ApiGetwayStackProps,) {

        const apgw = new aws_apigateway.RestApi(this, `${serviceName}-ApiGtw`);
        this.createEndPoints(productService, apgw, {
            name: "product",
            methods: ["GET", "POST"],
            child: {
                    name: "{id}",
                    methods: ["GET", "PUT", "DELETE"],
                },
        });

        this.createEndPoints(categoryService, apgw, {
            name: "category",
            methods: ["GET", "POST"],
            child: {
                name: "{id}",
                methods: ["GET", "PUT", "DELETE"],
            },
        });

        this.createEndPoints(detailService, apgw, {
            name: "detail",
            methods: ["GET", "POST"],
            child: {
                name: "{id}",
                methods: ["GET", "PUT", "DELETE"],
            },
        });
        // const apgw = new LambdaRestApi(this, `${serviceName}-ApiGtw`, {
        //     restApiName: `${serviceName}-ApiGtw`,
        //     handler,
        //     proxy: false
        // })

        // prodcut
        // const productResource = apgw.root.addResource("product");
        // productResource.addMethod("GET");
        // productResource.addMethod("POST");

        // const productIdResource = productResource.addResource("{id}");
        // productIdResource.addMethod("GET");
        // productIdResource.addMethod("PUT");
        // productIdResource.addMethod("DELETE");

        // const categoryResource = apgw.root.addResource("category");
        // categoryResource.addMethod("GET");
        // categoryResource.addMethod("POST");

        // const categoryIdResource = categoryResource.addResource("{id}");
        // categoryIdResource.addMethod("GET");
        // categoryIdResource.addMethod("PUT");
        // categoryIdResource.addMethod("DELETE");

        // const dealsResources = apgw.root.addResource("deals");
        // dealsResources.addMethod("GET");
        // dealsResources.addMethod("POST");

        // const dealsIdResource = dealsResources.addResource("{id}");
        // dealsIdResource.addMethod("GET");
        // dealsIdResource.addMethod("PUT");
        // dealsIdResource.addMethod("DELETE");

    }

    createEndPoints(handler: IFunction, resource: RestApi, { name, methods, child }: ResoureceType) {
        const lamdaFunction = new LambdaIntegration(handler);
        const rootResource = resource.root.addResource(name);
        methods.map((item) => {
            rootResource.addMethod(item, lamdaFunction);
        });

        if (child) {
            const childResource = rootResource.addResource(child.name);
            child.methods.map((item) => {
                childResource.addMethod(item, lamdaFunction);
            })
        }
    }


}