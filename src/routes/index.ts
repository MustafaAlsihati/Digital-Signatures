import { Router } from 'express';
import v1 from './v1';
import { IntegraterReq, mustBeAuthorized } from '../helpers/middleWare';

const router = Router();

router.use(mustBeAuthorized, (req: IntegraterReq, _, next) => {
  const apiVersion = req.headers['x-api-version'];
  switch (apiVersion) {
    case 'v1':
      router.use(v1);
      break;
    default:
      throw new Error('Invalid API Version');
  }
  next();
});

export default router;
