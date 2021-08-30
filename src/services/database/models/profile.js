module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    givenName: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    familyName: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    middleName: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    nickname: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    dateOfBirth: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    picture: {
      type: DataTypes.STRING(2000),
      allowNull: true,
    },
    deleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 0,
    },
  }, {
    timestamps: true,
  });

  Profile.associate = (models) => {
    // associations can be defined here
    Profile.hasMany(models.Email, { foreignKey: 'profileId', as: 'emails' });
    Profile.hasMany(models.Phone, { foreignKey: 'profileId', as: 'phones' });
    Profile.hasMany(models.Address, { foreignKey: 'profileId', as: 'addresses' });
  };

  return Profile;
};