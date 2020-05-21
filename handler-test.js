require('dotenv').config()
const handler = require('./handler')

console.log(
  handler.search(
    {
      body: JSON.stringify({
        query: 'test|one|two',
        limit: 10
      }),
      pathParameters: {
      },
    }, // event
    {}, //content
    function (data, ss) {
      //callback function with two arguments
      console.log(data, ss)
    }
  )
)