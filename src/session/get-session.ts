import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { SessionCache, Session } from '../session';

/**
 * Get the user's session from the request.
 *
 * @category Server
 */
export type GetSession = (
  req: IncomingMessage | NextApiRequest,
  res: ServerResponse | NextApiResponse
) => Session | null | undefined;

/**
 * @ignore
 */
export default function sessionFactory(sessionCache: SessionCache): GetSession {
  return (req, res): Session | null | undefined => {
    return sessionCache.get(req, res);
  };
}

/**
 * Set the user's session from the request.
 *
 * @category Server
 */
export type SetSession = (
  req: IncomingMessage | NextApiRequest,
  res: ServerResponse | NextApiResponse,
  session: Session
) => void;

/**
 * @ignore
 */
export function setSessionFactory(sessionCache: SessionCache): SetSession {
  return (req, res, session): void => {
    return sessionCache.set(req, res, session);
  };
}

/**
 * Create the user's session from the request.
 *
 * @category Server
 */
export type CreateSession = (
  req: IncomingMessage | NextApiRequest,
  res: ServerResponse | NextApiResponse,
  session: Session
) => void;

export function createSessionFactory(sessionCache: SessionCache): CreateSession {
  return (req, res, session: Session): void => {
    return sessionCache.create(req, res, session);
  };
}
