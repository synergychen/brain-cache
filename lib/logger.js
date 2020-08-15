function sendLog(logJson) {
  const https = require('https')
  const data = JSON.stringify(logJson)
  const options = {
    hostname: process.env['LOG_SERVER'],
    port: 443,
    path: '/collect',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
      'Authorization': `Basic ${process.env['LOG_AUTH_TOKEN']}`
    },
  }

  const req = https.request(options, (res) => {
    res.setEncoding('utf8')
    res.on('data', () => {})
  })
  req.on('error', (error) => {
    console.log(`Failed logging to: ${process.env['LOG_SERVER']}`)
    console.error(error)
  })
  req.write(data)
  req.end()
}

module.exports = {
  info: ({ event, context, error, duration = 0 }) => {
    const status = error ? (error.statusCode || 500) : 200
    const headers = event.headers || {}
    const logData = JSON.stringify({
      time: new Date().toISOString(),
      path: event.path,
      method: event.httpMethod,
      status,
      duration,
      params: JSON.parse(event.body || '{}'),
      appName: process.env['APP_NAME'],
      functionName: process.env['AWS_LAMBDA_FUNCTION_NAME'],
      requestId: context.awsRequestId,
      remoteIp: (headers['X-Forwarded-For'] || '').split(', ')[0],
      referer: headers['Referer'],
    })
    sendLog(logData)
  }
}