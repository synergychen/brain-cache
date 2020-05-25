'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'pages',
          'metadata',
          {
            type: Sequelize.DataTypes.JSONB,
            defaultValue: '{"highlights":[]}'
          },
          { transaction: t }
        ),
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('pages', 'metadata', { transaction: t }),
      ])
    })
  }
};
