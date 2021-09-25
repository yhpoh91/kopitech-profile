module.exports = {
  up: (queryInterface, Sequelize) => {
    const addUserIdColumn = () => queryInterface.addColumn('Users', 'userId', {
      type: Sequelize.STRING(45),
      allowNull: false,
    });

    return Promise.resolve()
      .then(addUserIdColumn);
  },
  down: (queryInterface) => {
    const removeUserIdColumn = () => queryInterface.removeColumn('Users', 'userId');
    return Promise.resolve()
      .then(removeUserIdColumn);
  },
};
