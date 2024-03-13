import bodyParser, { OptionsJson } from 'body-parser'
import { NextHandleFunction } from 'connect'

/**
 * The default maximum request body size for the JSON Body Parser
 */
export const DefaultJsonBodyParserOptionsLimit = '100kb'

/**
 * The default MIME types for the JSON Body Parser
 */
export const DefaultJsonBodyParserOptionsTypes = ['application/json', 'text/json']

/**
 * The default options for the JSON Body Parser
 */
export const DefaultJsonBodyParserOptions: OptionsJson = {
  limit: DefaultJsonBodyParserOptionsLimit,
  type: DefaultJsonBodyParserOptionsTypes,
}

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

/**
 * A JSON Body Parser middleware handler initialized with the default options
 */
export const jsonBodyParser = getJsonBodyParser()
