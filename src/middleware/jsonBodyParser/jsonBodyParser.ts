import bodyParser, { OptionsJson } from 'body-parser'
import { NextHandleFunction } from 'connect'
import { NextFunction, Request, Response } from 'express'

const bodyParserInstance = bodyParser.json({ type: ['application/json', 'text/json'] })

// If we do not trap this error, then it dumps too much to log, usually happens if request aborted
export const jsonBodyParser = (req: Request, res: Response, next: NextFunction) => {
  try {
    bodyParserInstance(req, res, next)
  } catch (ex) {
    const error = ex as Error
    console.log(`bodyParser failed [${error.name}]: ${error.message}`)
  }
}

export const DefaultJsonBodyParserOptions: OptionsJson = { type: ['application/json', 'text/json'] }

/**
 * Get a JSON Body Parser connect middleware handler
 * @param options The options for the JSON Body Parser
 * @returns A middleware function that parses JSON bodies
 */
export const getJsonBodyParser = (options: OptionsJson = DefaultJsonBodyParserOptions): NextHandleFunction => {
  // Create closed instance of bodyParser to prevent instantiation of new instance on every request
  const parser = bodyParser.json(options)

  // If we do not trap this error, then it dumps too much to log, usually happens if request aborted
  const ret: NextHandleFunction = (req, res, next) => {
    try {
      parser(req, res, next)
    } catch (ex) {
      const error = ex as Error
      console.log(`bodyParser failed [${error.name}]: ${error.message}`)
    }
  }
  return ret
}
