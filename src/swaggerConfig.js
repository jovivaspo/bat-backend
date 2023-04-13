const path = require("path")

const securityDef = {
    bearerAuth: {
        type: 'http',
        in: 'header',
        name: 'Authorization',
        description: 'Bearer token to access these api endpoints',
        scheme: 'bearer',
        bearerFormat: 'JWT',
    },
  };

const swaggerSpec = {
    definition:{
        openapi: "3.0.0",
        info:{
            title:"Battmovil API docs",
            version:"1.0.0"
        },
        servers:[
            {url: "http://localhost:8000"}
        ],
       components:{
        securitySchemes: securityDef
       },
       security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: [path.join(__dirname, './routers/*.js'), path.join(__dirname, './models/*.js')],
    
}


module.exports = swaggerSpec