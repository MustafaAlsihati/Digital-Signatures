import { Router } from 'express';
import { DocuSignConfig, Signature, Signer } from '../../types';
import onSendDocuSignEmail from './docusign';
import { IntegraterReq } from '../../helpers/middleWare';

const router = Router();

router.post('/docusign', async (req: IntegraterReq, res) => {
  // * Construct DocuSign Config Object:
  const { htmls, emailSubject, signers, signatures } = req.body;
  const config: DocuSignConfig = {
    clientId: req.integration?.clientAccessId!,
    userId: req.integration?.userAccessId!,
    htmls: htmls as string[],
    emailSubject: emailSubject as string,
    oAuthBasePath: req.integration?.oAuthBasePath!,
    redirectUri: req.integration?.redirectUri!,
    privateKey: req.integration?.privateKey!,
    signers: (signers ?? []) as Signer[],
    signatures: (signatures ?? []) as Signature[],
  };
  try {
    // ? Check if any value is undefined or null:
    if (Object.values(config).some(value => !value)) {
      throw new Error('Missing Required Values');
    }
    // ? Check if arrays are empty:
    if (!htmls.length || !config.signatures.length || !config.signers.length) {
      throw new Error(
        'Missing one of required values: { htmls, signatures, signers }',
      );
    }
    const result = await onSendDocuSignEmail(config);
    // * Redirect to Consent URL if User Token is not valid:
    if ('consent_url' in result) {
      res.redirect(result.consent_url);
      return;
    }
    // = Send Result Back to Client:
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
});

export default router;
