module.exports = {
  up: (queryInterface, Sequelize) => {
    const addUserIdColumn = () => queryInterface.addColumn('Profiles', 'userId', {
      type: Sequelize.STRING(45),
      allowNull: false,
    });

    return Promise.resolve()
      .then(addUserIdColumn);
  },
  down: (queryInterface) => {
    const removeUserIdColumn = () => queryInterface.removeColumn('Profiles', 'userId');
    return Promise.resolve()
      .then(removeUserIdColumn);
  },
};
