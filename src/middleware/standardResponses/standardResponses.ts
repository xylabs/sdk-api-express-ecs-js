import type { Request, Response } from 'express'
import { jsonMiddleware, TransformJson } from 'express-response-middleware'

import { getResponseMetadata } from './getResponseMetadata.ts'

/**
 * Transforms each response to conform to the standard response format (compatible with JSON API)
 * @param body The original request body
 * @param _req The request
 * @param res The response
 * @returns The transformed response body
 */
export const transformResponse: TransformJson = (body, _req, res) => {
  if (res.statusCode >= 400) return
  const meta = getResponseMetadata(res)
  return { data: body, meta }
}

/**
 * Connect middleware to enable the transform of all responses to match
 * the standard response format (compatible with JSON API)
 */

export const standardResponses = jsonMiddleware(transformResponse)
