const appName = 'brain-cache'

module.exports = {
  info: ({ event, context, error, duration = 0 }) => {
    const status = error ? (error.statusCode || 500) : 200
    const headers = event.headers || {}
    console.log({
      time: new Date().toISOString(),
      path: event.path,
      method: event.httpMethod,
      status,
      duration,
      params: JSON.parse(event.body || '{}'),
      appName,
      functionName: process.env['AWS_LAMBDA_FUNCTION_NAME'],
      requestId: context.awsRequestId,
      remoteIp: (headers['X-Forwarded-For'] || '').split(', ')[0],
      referer: headers['Referer'],
    })
  }
}