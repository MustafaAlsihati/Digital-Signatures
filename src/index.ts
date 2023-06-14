import dotEnv from 'dotenv';
dotEnv.config();
import express from 'express';
import routes from './routes';
// import swaggerJsdoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';

// * Express App:
const app = express();
app.use('/api', routes);

// ? Listen on port 5000:
app.listen(process.env.PORT ?? 5000, () => {
  process.env.NODE_ENV === 'dev' &&
    console.log(`Server is listening at: http://localhost:5000`);
});
