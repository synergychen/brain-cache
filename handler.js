const connection = require('./models/index')
const { successResponse, errorResponse } = require('./handler-helpers')

module.exports.findPage = async (event) => {
  try {
    const { title, url } = event.queryStringParameters
    const { Page } = await connection()
    let payload = {}
    if (title) { payload.title = title }
    if (url) { payload.url = url }
    const page = await Page.findOne({
      where: payload,
      attributes: ['title', 'url']
    })
    return successResponse(page)
  } catch (err) {
    return errorResponse(err, event)
  }
}

module.exports.star = async (event) => {
  try {
    const body = JSON.parse(event.body)
    const { Page } = await connection()
    const result = await Page.create(body)
    return successResponse(result)
  } catch (err) {
    return errorResponse(err, event)
  }
}

module.exports.unstar = async (event) => {
  try {
    const { title } = event.queryStringParameters
    const { Page } = await connection()
    const page = await Page.findOne({ where: { title } })
    await Page.destroy({ where: { id: page.id } })
    return successResponse({ deleted: true })
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
