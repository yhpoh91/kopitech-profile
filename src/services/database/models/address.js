module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
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
    address1: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    address2: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    address3: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    locality: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    postalCode: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(100),
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

  Address.associate = (models) => {
    // associations can be defined here
    Address.belongsTo(models.Profile, { foreignKey: 'profileId', as: 'profile' });
  };

  return Address;
};