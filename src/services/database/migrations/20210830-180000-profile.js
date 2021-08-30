module.exports = {
  up: (queryInterface, Sequelize) => {
    const createProfilesTable = () => queryInterface.createTable('Profiles', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      givenName: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      familyName: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      middleName: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      nickname: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      dateOfBirth: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      gender: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      picture: {
        type: Sequelize.STRING(2000),
        allowNull: true,
      },
      deleted: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    return Promise.resolve()
      .then(createProfilesTable);
  },
  down: (queryInterface) => {
    const dropProfilesTable = () => queryInterface.dropTable('Profiles');
    return Promise.resolve()
      .then(dropProfilesTable);
  },
};