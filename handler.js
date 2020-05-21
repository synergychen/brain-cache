const connection = require('./models/index')
const { successResponse, errorResponse } = require('./handler-helpers')

module.exports.search = async (event) => {
  try {
    const { query } = JSON.parse(event.body)
    const models = await connection()
    const results = await models.sequelize.query(
      `
      SELECT *
      FROM ${models.Page.tableName}
      WHERE _search @@ plainto_tsquery('english', :query);
      `,
      {
        model: models.Author,
        replacements: { query: query },
      }
    )
    return successResponse(results)
  } catch (err) {
    return errorResponse(err)
  }
}
