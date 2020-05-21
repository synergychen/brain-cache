const models = require('./models/index')

const search = async function search(query) {
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
  console.log(results)

  return results
}

search('one')
