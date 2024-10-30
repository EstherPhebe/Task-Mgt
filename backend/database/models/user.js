module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "users",
      underscored: true,
    }
  );

  User.associate = (models) => {
    User.hasMany(models.tasks, {
      foreignKey: "user_id",
      as: "tasks",
    });
  };
  return User;
};
