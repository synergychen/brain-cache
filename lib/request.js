const performance = require('perf_hooks').performance
const logger = require('./logger')
const { successResponse, errorResponse } = require('./response')

module.exports = {
  handleRequest: async (func, event, context) => {
    let data, error
    const start = performance.now()
    try {
      data = await func(event, context)
    } catch (err) {
      error = err
    }
    const duration = Math.round(performance.now() - start)
    logger.info({ event, context, error, duration })
    if (error) return errorResponse(error)
    return successResponse(data)
  }
}
