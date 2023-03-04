const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database')

const Instructor = sequelize.define('instructor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email_verified_at : "TIMESTAMP",
  mobile_verified_at: "TIMESTAMP",
  remember_token :DataTypes.STRING,
  country_code:DataTypes.STRING,
  mobile : {
    type : DataTypes.INTEGER,
    allowNull:false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status : DataTypes.TINYINT,
  ban : DataTypes.INTEGER,
  deleted : DataTypes.INTEGER,
  document_verified:DataTypes.INTEGER,
  available:DataTypes.TINYINT,
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
},
updatedAt: {
    field: 'updated_at',
    type: DataTypes.DATE,
}
});

module.exports = Instructor;