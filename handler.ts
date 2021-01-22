import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import placesRouter from "./src/routes/places";

export const placesHandler: APIGatewayProxyHandler = async (event, context) => {
  return placesRouter.run(event, context);
};
