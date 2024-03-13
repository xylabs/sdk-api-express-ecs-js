import bodyParser from 'body-parser'
import type {NextHandleFunction} from 'connect'

const bodyParserInstance = bodyParser.json({ type: ['application/json', 'text/json'] })

// If we do not trap this error, then it dumps too much to log, usually happens if request aborted
export const jsonBodyParser: NextHandleFunction = (req, res, next) => {
  try {
    bodyParserInstance(req, res, next)
  } catch (ex) {
    const error = ex as Error
    console.log(`bodyParser failed [${error.name}]: ${error.message}`)
  }
}
