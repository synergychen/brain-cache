module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('pages', [
      {
        title: 'Test 1',
        url: 'https://www.example.com/pages/1',
        content: 'This is test page one',
        visited_at: new Date()
      },
      {
        title: 'Test 2',
        url: 'https://www.example.com/pages/2',
        content: 'This is test page two',
        visited_at: new Date()
      },
      {
        title: 'Test 3',
        url: 'https://www.example.com/pages/3',
        content: 'This is test page three',
        visited_at: new Date()
      },
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('pages', null, {})
  }
}
