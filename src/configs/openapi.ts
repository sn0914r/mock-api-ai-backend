import swaggerJSDoc from "swagger-jsdoc";

export const openApiSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Mock API AI Backend",
      version: "1.0.0",
      description: "REST API for Mock API AI Generator",
    },

    tags: [
      { name: "Generator" },
      { name: "Dynamic API" },
    ],

    servers: [
      {
        url: "/",
        description: "Current Environment",
      },
    ],
    components: {
      schemas: {
        ErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              example: "Something went wrong",
            },
          },
        },
      },
    },
  },

  apis: ["./docs/**/*.yml"],
});
