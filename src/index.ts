import * as dotEnv from 'dotenv';
dotEnv.config();
import * as express from 'express';
import * as fs from 'fs';
// * Routes:
import onSendDocuSignEmail from './docusign';
import { DocuSignConfig, Signature, Signer } from './types';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

router.post('/send', async (req, res) => {
  try {
    const privateKey = fs.readFileSync(`${__dirname}/keys/private.key`);
    let configs: DocuSignConfig = {
      // * Environment Variables:
      clientId: process.env.DOCUSIGN_CLIENT_ID!,
      userId: process.env.DOCUSIGN_USER_ID!,
      oAuthBasePath: process.env.OAUTHBASEPATH!,
      redirectUri: process.env.REDIRECT_URI!,
      privateKey,
      // * Request Body:
      htmls: req.body.htmls as string[],
      emailSubject: req.body.emailSubject as string,
      signers: req.body.signers as Signer[],
      signatures: req.body.signatures as Signature[],
    };

    if (!configs.htmls || !configs.htmls.length) {
      throw new Error('No HTMLs provided');
    }

    if (!configs.signers || !configs.signers.length) {
      throw new Error('No Signers provided');
    }

    if (!configs.signatures || !configs.signatures.length) {
      throw new Error('No Signatures provided');
    }

    if (!(configs.emailSubject ?? '').length) {
      throw new Error('No Email Subject provided');
    }

    // * Send DocuSign Email:
    const result = await onSendDocuSignEmail(configs);
    // ? Redirect to Consent URL if User Token is not valid:
    if ('consent_url' in result) {
      res.redirect(result.consent_url);
      return;
    }
    // = Send Result Back to Client:
    res.send(result);
  } catch (error) {
    console.error('[ERROR]', error);
    res.status(500).send({ message: error.message });
  }
});

// * Routes:
app.use('/api', router);

// ? Listen on port 5000:
app.listen(process.env.PORT ?? 5000, () => {
  process.env.NODE_ENV === 'dev' &&
    console.log(`Server is listening at: http://localhost:5000`);
});
