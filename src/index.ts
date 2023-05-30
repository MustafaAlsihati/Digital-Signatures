import dotEnv from 'dotenv';
dotEnv.config();
import onSendDocuSignEmail from './docusign';

// # Run Server (Only in Development):
if (process.env.NODE_ENV === 'dev') {
  import('express').then(({ default: express }) => {
    const app = express();
    // ? Test Route to send email:
    app.get('/send', async (_, res) => {
      try {
        const result = await onSendDocuSignEmail();
        // * Redirect to Consent URL if User Token is not valid:
        if ('consent_url' in result) {
          res.redirect(result.consent_url);
          return;
        }
        // = Send Result Back to Client:
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });
    // ? Listen on port 5000:
    app.listen(5000, () => {
      console.log(`Server is listening at: http://localhost:5000`);
    });
  });
}

export default onSendDocuSignEmail;
