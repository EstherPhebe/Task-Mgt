module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type:DataTypes.STRING
    },
    dueDate: {
      type: DataTypes.DATE
    },
    priority: {
      type: DataTypes.ENUM('Critical', 'High', 'Medium', 'Low'),
      defaultValue: 'Low',
    },
    status: {
      type: DataTypes.ENUM('To-Do', 'Pending', 'Complete', 'Low'),
      defaultValue: 'To-Do',
    }
  });

  Task.associate = models => {
    Task.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    })

  }
  
  return Task;
};