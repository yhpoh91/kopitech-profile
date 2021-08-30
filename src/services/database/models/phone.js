module.exports = (sequelize, DataTypes) => {
  const Phone = sequelize.define('Phone', {
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
    phone: {
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

  Phone.associate = (models) => {
    // associations can be defined here
    Phone.belongsTo(models.Profile, { foreignKey: 'profileId', as: 'profile' });
  };

  return Phone;
};