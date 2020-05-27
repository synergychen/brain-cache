const connection = require('./models/index')
const { successResponse, errorResponse } = require('./handler-helpers')

module.exports.searchBy = async (event) => {
  try {
    const { title, url } = JSON.parse(event.body)
    const { Page } = await connection()
    let payload = {}
    if (title) { payload.title = title }
    if (url) { payload.url = url }
    const page = await Page.findOne({
      where: payload,
      attributes: ['id', 'title', 'url', 'metadata']
    })
    console.log(page)
    return successResponse(page)
  } catch (err) {
    return errorResponse(err, event)
  }
}

module.exports.star = async (event) => {
  try {
    const body = JSON.parse(event.body)
    const { Page } = await connection()
    const { id, title, url, metadata } = await Page.create(body)
    return successResponse({ id, title, url, metadata })
  } catch (err) {
    return errorResponse(err, event)
  }
}

module.exports.unstar = async (event) => {
  try {
    const { id } = event.pathParameters
    const { Page } = await connection()
    await Page.destroy({ where: { id } })
    return successResponse({ deleted: true, id })
  } catch (err) {
    return errorResponse(err, event)
  }
}

module.exports.highlight = async (event) => {
  try {
    const { id } = event.pathParameters
    const { text } = JSON.parse(event.body)
    const { Page } = await connection()
    const page = await Page.findOne({ where: { id }, attributes: ['id', 'title', 'url', 'metadata'] })
    let metadata = page.metadata
    if (metadata.highlights.indexOf(text) > -1) {
      return successResponse(page)
    }
    metadata.highlights.push(text)
    page.metadata = metadata
    page.save()
    return successResponse(page)
  } catch (err) {
    return errorResponse(err, event)
  }
}

module.exports.unhighlight = async (event) => {
  try {
    const { id } = event.pathParameters
    const { text } = JSON.parse(event.body)
    const { Page } = await connection()
    const page = await Page.findOne({ where: { id }, attributes: ['id', 'title', 'url', 'metadata'] })
    let metadata = page.metadata
    metadata.highlights = metadata.highlights.filter(h => h !== text)
    page.metadata = metadata
    page.save()
    return successResponse(page)
  } catch (err) {
    return errorResponse(err, event)
  }
}

module.exports.search = async (event) => {
  try {
    const resultsLimit = 10
    const { query, limit = resultsLimit } = JSON.parse(event.body)
    const models = await connection()
    const results = await models.sequelize.query(
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
    return successResponse(results)
  } catch (err) {
    return errorResponse(err)
  }
}
