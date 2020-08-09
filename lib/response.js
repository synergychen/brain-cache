const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
}

module.exports = {
  successResponse: (data = {}) => {
    // Development logging
    if (process.env.NODE_ENV !== 'production') {
      console.log(JSON.stringify(data, null, 2))
    }
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    }
  },
  errorResponse: (err, event = {}) => {
    // Development logging
    if (process.env.NODE_ENV !== 'production') {
      console.log(err)
    }
    return {
      statusCode: err.statusCode || 500,
      headers,
      body: JSON.stringify({
        event: event,
        err: err,
      }),
    }
  }
}