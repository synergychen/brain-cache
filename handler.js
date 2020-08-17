const connection = require('./models/index')
const { handleRequest } = require('./lib/request')

async function search(event) {
  const resultsLimit = 10
  const { query, limit = resultsLimit } = JSON.parse(event.body)
  const models = await connection()
  return models.sequelize.query(
    `
    SELECT title, url, ts_rank_cd(_search, query) AS rank
    FROM pages, to_tsquery(:query) query
    WHERE query @@ _search
    ORDER BY rank DESC
    LIMIT :limit;
    `,
    {
      model: models.Author,
      replacements: { query, limit },
    }
  )
}

async function searchBy(event) {
  const { title, url } = JSON.parse(event.body)
  const { Page } = await connection()
  let payload = {}
  if (title) { payload.title = title }
  if (url) { payload.url = url }
  const page = await Page.findOne({
    where: payload,
    attributes: ['id', 'title', 'url', 'metadata']
  })
  return Promise.resolve(page)
}

async function star(event) {
  const body = JSON.parse(event.body)
  const { Page } = await connection()
  const { id, title, url, metadata } = await Page.create(body)
  return Promise.resolve({ id, title, url, metadata })
}

async function unstar(event) {
  const { id } = event.pathParameters
  const { Page } = await connection()
  return Page.destroy({ where: { id } })
}

async function highlight(event) {
  const { id } = event.pathParameters
  const { text } = JSON.parse(event.body)
  const { Page } = await connection()
  const page = await Page.findOne({ where: { id }, attributes: ['id', 'title', 'url', 'metadata'] })
  let metadata = page.metadata
  if (metadata.highlights.indexOf(text) > -1) {
    return Promise.resolve(page)
  }
  metadata.highlights.push(text)
  page.metadata = metadata
  page.save()
  return Promise.resolve(page)
}

async function unhighlight(event) {
  const { id } = event.pathParameters
  const { text } = JSON.parse(event.body)
  const { Page } = await connection()
  const page = await Page.findOne({ where: { id }, attributes: ['id', 'title', 'url', 'metadata'] })
  let metadata = page.metadata
  metadata.highlights = metadata.highlights.filter(h => h !== text)
  page.metadata = metadata
  page.save()
  return Promise.resolve(page)
}

// Find all pages by keywords
module.exports.search = async(event, context) => {
  return handleRequest(search, event, context)
}

// Find a page by title or url
module.exports.searchBy = async(event, context) => {
  return handleRequest(searchBy, event, context, false)
}

// Star a page
module.exports.star = async(event, context) => {
  return handleRequest(star, event, context)
}

// Unstar a page
module.exports.unstar = async(event, context) => {
  return handleRequest(unstar, event, context)
}

// Highlight a sentense
module.exports.highlight = async(event, context) => {
  return handleRequest(highlight, event, context)
}

// Unhighlight a sentense
module.exports.unhighlight = async(event, context) => {
  return handleRequest(unhighlight, event, context)
}
