module.exports = (sequelize, DataTypes) => {
  const Page = sequelize.define(
    'Page',
    {
      title: DataTypes.STRING,
      url: DataTypes.TEXT,
      content: DataTypes.TEXT,
      visited_at: DataTypes.DATE,
    },
    {
      tableName: 'pages',
      timestamps: false,
      underscore: true,
    }
  )
  Page.associate = function(models) {
    // associations can be defined here
  }
  return Page
}