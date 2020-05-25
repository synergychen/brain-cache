module.exports = (sequelize, DataTypes) => {
  const Page = sequelize.define(
    'Page',
    {
      title: DataTypes.STRING,
      url: DataTypes.TEXT,
      content: DataTypes.TEXT,
      metadata: {
        type: DataTypes.JSONB,
        get() {
          return JSON.parse(this.getDataValue('metadata'))
        },
        set(value) {
          return this.setDataValue('metadata', JSON.stringify(value))
        },
      },
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