const {Sequelize} = require("sequelize");

const sequelize = new Sequelize("swasthin", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
