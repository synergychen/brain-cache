require('dotenv').config()
const handler = require('./handler')

const findPage = () => {
  handler.findPage(
    {
      queryStringParameters: {
        title: 'skip - Google Search',
        url:
          'https://www.google.com/search?sxsrf=ALeKk01HlX9XTteWcd0sHtA9aFidc_6bmw%3A1590257907440&ei=82jJXtq4Go7K_Qbt0ojgDw&q=skip&oq=skip&gs_lcp=CgZwc3ktYWIQAzIECCMQJzIHCAAQFBCHAjIHCAAQFBCHAjICCAAyBAgAEEMyAggAMgIIADICCAAyAggAMgIIADoECAAQRzoFCAAQkQI6BQgAEIMBUPW8AVjNwAFg4sEBaABwAngAgAFQiAGWApIBATSYAQCgAQGqAQdnd3Mtd2l6&sclient=psy-ab&ved=0ahUKEwia_rGtzMrpAhUOZd8KHW0pAvwQ4dUDCAw&uact=5',
      },
    }, // event
    {}, //content
    function (data, ss) {
      //callback function with two arguments
      console.log(data, ss)
    }
  )
}

const createPage = () => {
  handler.createPage(
    {
      body: JSON.stringify({
        title: 'Full text search',
        url: 'https://www.google.com/search?sxsrf=ALeKk03JZyYEyu12ZowN8eOKpHmIaekECw%3A1590187253571&source=hp&ei=9VTIXtftIJ-bjLsP5JiBCA&q=full+text+search&oq=full+text+search&gs_lcp=CgZwc3ktYWIQAzIECCMQJzIECCMQJzIECCMQJzICCAAyAggAMgIIADICCAAyAggAMgIIADICCAA6BwgjEOoCECc6BQgAEJECOgUIABCDAToICAAQgwEQkQJQmgpYkzBg7DFoCHAAeAGAAbsCiAHCHpIBCDAuMTYuNS4ymAEAoAEBqgEHZ3dzLXdperABCg&sclient=psy-ab&ved=0ahUKEwiXvP6SxcjpAhWfDWMBHWRMAAEQ4dUDCAk&uact=5',
        content:
          'Accessibility Links Skip to main content Accessibility help Accessibility feedback .. Search Modes All Videos Images News Shopping More SettingsTools About 11,470,000,000 results',
        visited_at: new Date()
      }),
      pathParameters: {},
    }, // event
    {}, //content
    function (data, ss) {
      //callback function with two arguments
      console.log(data, ss)
    }
  )
}

const highlight = () => {
  handler.highlight(
    {
      body: JSON.stringify({
        text: 'weekly'
      }),
      pathParameters: {
        id: 42
      },
    }, // event
    {}, //content
    function (data, ss) {
      //callback function with two arguments
      console.log(data, ss)
    }
  )
}

const unhighlight = () => {
  handler.unhighlight(
    {
      body: JSON.stringify({
        text: 'weekly'
      }),
      pathParameters: {
        id: 42
      },
    }, // event
    {}, //content
    function (data, ss) {
      //callback function with two arguments
      console.log(data, ss)
    }
  )
}

const search = () => {
  handler.search(
    {
      body: JSON.stringify({
        query: 'skip',
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
}

unhighlight()