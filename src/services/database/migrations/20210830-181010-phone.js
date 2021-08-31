module.exports = {
  up: (queryInterface, Sequelize) => {
    const createPhonesTable = () => queryInterface.createTable('Phones', {
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
      phone: {
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
      .then(createPhonesTable);
  },
  down: (queryInterface) => {
    const dropPhonesTable = () => queryInterface.dropTable('Phones');
    return Promise.resolve()
      .then(dropPhonesTable);
  },
};