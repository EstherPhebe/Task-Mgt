module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "tasks",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      due_by: {
        type: DataTypes.DATEONLY,
      },
      priority: {
        type: DataTypes.STRING,
        defaultValue: "low",
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "complete",
      },
    },
    {
      tableName: "tasks",
      underscored: true,
    }
  );

  Task.associate = (models) => {
    Task.belongsTo(models.users, {
      foreignKey: "user_id",
      as: "users",
    });
  };

  return Task;
};
