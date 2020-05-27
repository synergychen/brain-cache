const vectorName = '_search'
const searchObjects = {
  pages: ['title', 'content', 'metadata'],
}

module.exports = {
  up: (queryInterface) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all(
        Object.keys(searchObjects).map((table) =>
          // Add tsvector column
          queryInterface.sequelize
            .query(
              `
              ALTER TABLE ${table} ADD COLUMN ${vectorName} TSVECTOR;
              `,
              { transaction: t }
            )
            // Create custom search dictionary and configuration
            .then(() =>
              queryInterface.sequelize.query(
                `
                CREATE TEXT SEARCH DICTIONARY simple_english
                  (TEMPLATE = pg_catalog.simple, STOPWORDS = english);

                CREATE TEXT SEARCH CONFIGURATION simple_english
                  (copy = english);
                ALTER TEXT SEARCH CONFIGURATION simple_english
                  ALTER MAPPING FOR asciihword, asciiword, hword, hword_asciipart, hword_part, word
                  WITH simple_english;
                `,
                { transaction: t }
              )
            )
            // Update tsvector column based on url and content
            .then(() =>
              queryInterface.sequelize.query(
                `
                UPDATE ${table} SET ${vectorName} = to_tsvector('simple_english', ${searchObjects[
                  table
                ].join(" || ' ' || ")});
                `,
                { transaction: t }
              )
            )
            // Add index to tsvector column
            .then(() =>
              queryInterface.sequelize.query(
                `
                CREATE INDEX ${table}_search ON ${table} USING gin(${vectorName});
                `,
                { transaction: t }
              )
            )
            // Add trigger to update tsvector column on create and update
            .then(() =>
              queryInterface.sequelize.query(
                `
                CREATE TRIGGER ${table}_vector_update
                BEFORE INSERT OR UPDATE ON ${table}
                FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger(${vectorName}, 'pg_catalog.simple_english', ${searchObjects[
                  table
                ].join(', ')});
                `,
                { transaction: t }
              )
            )
            .error(console.log)
        )
      )
    ),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all(
        Object.keys(searchObjects).map((table) =>
          // Remove trigger
          queryInterface.sequelize
            .query(
              `
              DROP TRIGGER ${table}_vector_update ON ${table};
              `,
              { transaction: t }
            )
            // Remove index
            .then(() =>
              queryInterface.sequelize.query(
                `
                DROP INDEX ${table}_search;
                `,
                { transaction: t }
              )
            )
            // Drop search dictionary and configuration
            .then(() =>
              queryInterface.sequelize.query(
                `
                DROP TEXT SEARCH CONFIGURATION simple_english;
                DROP TEXT SEARCH DICTIONARY simple_english;
                `,
                { transaction: t }
              )
            )
            // Remove tsvector column
            .then(() =>
              queryInterface.sequelize.query(
                `
                ALTER TABLE ${table} DROP COLUMN ${vectorName};
                `,
                { transaction: t }
              )
            )
        )
      )
    ),
}