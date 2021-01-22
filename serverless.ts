import type { Serverless } from "serverless/aws";

const serverlessConfiguration: Serverless = {
  service: {
    name: "places-service",
  },
  frameworkVersion: ">=1.72.0",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  // Add the serverless-webpack plugin
  plugins: ["serverless-webpack", "serverless-offline"],
  provider: {
    name: "aws",
    runtime: "nodejs12.x",
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
  },
  functions: {
    places: {
      handler: "handler.placesHandler",
      events: [
        {
          http: {
            method: "ANY",
            path: "places/{proxy+}",
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
