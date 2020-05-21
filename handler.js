const connection = require('./models/index')
const { successResponse, errorResponse } = require('./handler-helpers')

module.exports.search = async (event) => {
  try {
    const resultsLimit = 10
    const { query, limit = resultsLimit } = JSON.parse(event.body)
    const models = await connection()
    const results = await models.sequelize.query(
      `
      SELECT title, content, ts_rank_cd(_search, query) AS rank
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
