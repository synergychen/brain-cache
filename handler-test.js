require('dotenv').config()
const handler = require('./handler')

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

search()