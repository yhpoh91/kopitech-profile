module.exports = (sequelize, DataTypes) => {
  const Email = sequelize.define('Email', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    profileId: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
    email: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    deleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 0,
    },
  }, {
    timestamps: true,
  });

  Email.associate = (models) => {
    // associations can be defined here
    Email.belongsTo(models.Profile, { foreignKey: 'profileId', as: 'profile' });
  };

  return Email;
};