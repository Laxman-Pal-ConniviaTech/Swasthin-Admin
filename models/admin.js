const { DataTypes } = require("sequelize");

const sequelize = require("../utils/database");

const Admin = sequelize.define("admin", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email_verified_at: "TIMESTAMP",
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  remember_token:{
    type : DataTypes.STRING,
    allowNull:true
  },
  deleted_at: "TIMESTAMP",
  createdAt: {
    field: "created_at",
    type: DataTypes.DATE,
  },
  updatedAt: {
    field: "updated_at",
    type: DataTypes.DATE,
  },
});

module.exports = Admin;
