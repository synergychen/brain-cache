const performance = require('perf_hooks').performance
const logger = require('./logger')
const { successResponse, errorResponse } = require('./response')

function verifyAuthToken (event) {
  const authorization = event.headers['Authorization'] || ''
  console.log(authorization, process.env.AUTH_TOKEN)
  return authorization === 'Basic ' + process.env.AUTH_TOKEN
}

module.exports = {
  handleRequest: async (func, event, context, log = true) => {
    if (!verifyAuthToken(event)) {
      return errorResponse({ statusCode: 401, message: 'Invalid Token' })
    }

    let data, error
    const start = performance.now()
    try {
      data = await func(event, context)
    } catch (err) {
      error = err
    }
    const duration = Math.round(performance.now() - start)
    if (log) {
      logger.info({ event, context, error, duration })
    }
    if (error) return errorResponse(error)
    return successResponse(data)
  }
}
