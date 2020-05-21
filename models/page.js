module.exports = (sequelize, DataTypes) => {
  const Page = sequelize.define('Page', {
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    content: DataTypes.TEXT,
    visited_at: DataTypes.DATE
  }, {
    underscore: true
  })
  Page.associate = function(models) {
    // associations can be defined here
  }
  return Page
}