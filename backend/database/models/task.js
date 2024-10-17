module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    dueBy: {
      type: DataTypes.DATEONLY,
    },
    priority: {
      type: DataTypes.ENUM("Critical", "High", "Medium", "Low"),
      defaultValue: "Low",
    },
    status: {
      type: DataTypes.ENUM("To-Do", "Pending", "Complete"),
      defaultValue: "To-Do",
    },
  });

  Task.associate = (models) => {
    Task.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return Task;
};
