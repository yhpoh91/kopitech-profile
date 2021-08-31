module.exports = {
  up: (queryInterface, Sequelize) => {
    const createEmailsTable = () => queryInterface.createTable('Emails', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      profileId: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      type: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },
      isDefault: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },
      email: {
        type: Sequelize.STRING(1000),
        allowNull: false,
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
      .then(createEmailsTable);
  },
  down: (queryInterface) => {
    const dropEmailsTable = () => queryInterface.dropTable('Emails');
    return Promise.resolve()
      .then(dropEmailsTable);
  },
};