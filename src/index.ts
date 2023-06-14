import dotEnv from 'dotenv';
dotEnv.config();
import express from 'express';
import SwaggerUi from 'swagger-ui-express';
import routes from './routes';

// # Package Json:
const doc_v1_json = require('./docs/doc_v1.json');

// * Express App:
const app = express();
app.use('/api', routes);

// * Documentation:
const latestVersion = '/v1';
// ? Version 1:
const options_v1 = {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Digital Signiture API v1',
};
const v1Setup = SwaggerUi.setup(doc_v1_json, options_v1);
app.use('/docs/v1', SwaggerUi.serve, v1Setup);
// ? Redirect to latest version:
app.use('/docs', (_, res) => res.redirect(`/docs/${latestVersion}`));

// ? Listen on port 5000:
app.listen(process.env.PORT ?? 5000, () => {
  process.env.NODE_ENV === 'dev' &&
    console.log(`Server is listening at: http://localhost:5000`);
});
