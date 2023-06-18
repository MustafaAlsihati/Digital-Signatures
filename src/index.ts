import dotEnv from 'dotenv';
dotEnv.config();
import express from 'express';
import * as fs from 'fs';
// * Routes:
import onSendDocuSignEmail from './docusign';
import { DocuSignConfig, Signature, Signer } from './types';

const app = express();

console.log('__dirname', __dirname);

app.get('/send', async (req, res) => {
  try {
    const privateKeyPath = process.env.PRIVATE_KEY_PATH!;
    const privateKey = fs.readFileSync(`${__dirname}/${privateKeyPath}`);
    let configs: DocuSignConfig = {
      clientId: process.env.DOCUSIGN_CLIENT_ID!,
      userId: process.env.DOCUSIGN_USER_ID!,
      htmls: req.body.htmls as string[],
      emailSubject: req.body.emailSubject as string,
      oAuthBasePath: process.env.OAUTHBASEPATH!,
      redirectUri: process.env.REDIRECT_URI!,
      privateKey,
      signers: req.body.signers as Signer[],
      signatures: req.body.signatures as Signature[],
    };
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
    res.status(500).send({ message: error.message });
  }
});

// ? Listen on port 5000:
app.listen(process.env.PORT ?? 5000, () => {
  process.env.NODE_ENV === 'dev' &&
    console.log(`Server is listening at: http://localhost:5000`);
});
