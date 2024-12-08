module.exports = (sequelize, DataTypes) => {
  const task = sequelize.define(
    "task",
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
      underscored: true,
    }
  );

  task.associate = (models) => {
    task.belongsTo(models.user, {
      foreignKey: "user_id",
    });
  };

  return task;
};
