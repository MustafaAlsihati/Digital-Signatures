import { Request, Response, NextFunction } from 'express';
import { getPrisma } from '../db/prisma';
import { integrations as integrationType } from '@prisma/client';

type Headers = Request['headers'];
interface IntegraterHeaders extends Headers {
  ['x-client-id']?: string;
  ['x-user-id']?: string;
  ['x-api-version']?: string;
  ['x-api-key']?: string;
}
export interface IntegraterReq extends Request {
  headers: IntegraterHeaders;
  integration?: Partial<integrationType> | null;
}

export async function mustBeAuthorized(
  req: IntegraterReq,
  res: Response,
  next: NextFunction,
) {
  try {
    req.headers['x-api-version'] = req.headers['x-api-version'] ?? 'v1';
    // ? Check if client id is valid:
    if (!req.headers['x-client-id']) {
      throw new Error('Missing required header: x-client-id');
    }
    // ? Check if user id is valid:
    const userAccessId = req.headers['x-user-id'];
    if (!userAccessId) {
      throw new Error('Missing required header: x-user-id');
    }
    // ? Check if api key is valid:
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) {
      throw new Error('Missing required header: x-api-key');
    }

    // * Fetch Client Data and Service:
    const prisma = getPrisma();
    const data = await prisma.integrations.findFirst({
      where: {
        userAccessId,
        apiKey,
      },
      select: {
        id: true,
        clientAccessId: true,
        userAccessId: true,
        apiKey: true,
        oAuthBasePath: true,
        redirectUri: true,
        privateKey: true,
      },
    });

    // ? Check if user id and api key are valid:
    if (!data) {
      throw new Error('Invalid userId or apiKey');
    }

    // * Assign Client Data:
    req.integration = data;

    // = Continue to next middleware:
    next();
  } catch (error) {
    res.status(401).send({ message: 'Invalid userId or apiKey' });
  }
}
