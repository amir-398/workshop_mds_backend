import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Workshop MDS API",
      version: "1.0.0",
      description: "API documentation for Workshop MDS backend",
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Le chemin vers tes fichiers de routes
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;
