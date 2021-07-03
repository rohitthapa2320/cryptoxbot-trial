const Sequelize= require('sequelize');

const sequelize = new Sequelize('cryptoxbot', 'root', 'rohitthapa2120', {
  dialect: 'mysql', host: 'localhost'
});

module.exports= sequelize;