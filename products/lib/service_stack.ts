import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nodejs";
import { join } from "path";
import { Construct } from "constructs";

interface ServiceProps {
  bucket?: any;
}

export class ServiceStack extends Construct {
  public readonly productService: NodejsFunction;
  public readonly categoryService: NodejsFunction;
  public readonly detailService: NodejsFunction;

  constructor(scope: Construct, id: string, props: ServiceProps) {
    super(scope, id);

    const nodeJsFunctionProps: NodejsFunctionProps = {
      bundling: {
        externalModules: ["aws-sdk"],
      },
      environment: {
        BUCKET_NAME: "OUR_BUCKET_ARN",
      },
      runtime: Runtime.NODEJS_16_X,
    };

 
    this.categoryService = new NodejsFunction(this, "categoryLambda", {
      entry: join(__dirname, "/../src/category-api.ts"),
      ...nodeJsFunctionProps,
    });
    
    this.productService = new NodejsFunction(this, "productLambda", {
      entry: join(__dirname, "/../src/product-api.ts"),
      ...nodeJsFunctionProps,
    });

    
    this.detailService = new NodejsFunction(this, "detailLambda", {
      entry: join(__dirname, "/../src/details-api.ts"),
      ...nodeJsFunctionProps,
    });
  }
}