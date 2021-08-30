module.exports = {
  up: (queryInterface, Sequelize) => {
    const createAddressesTable = () => queryInterface.createTable('Addresses', {
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
      address1: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      address2: {
        type: Sequelize.STRING(1000),
        allowNull: true,
      },
      address3: {
        type: Sequelize.STRING(1000),
        allowNull: true,
      },
      locality: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      region: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      postalCode: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING(100),
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
      .then(createAddressesTable);
  },
  down: (queryInterface) => {
    const dropAddressesTable = () => queryInterface.dropTable('Addresses');
    return Promise.resolve()
      .then(dropAddressesTable);
  },
};