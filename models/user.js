const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database')

const User = sequelize.define('user', {
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
  country_code:DataTypes.STRING,
  mobile : {
    type : DataTypes.INTEGER,
    allowNull:false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age:{
    type: DataTypes.STRING,
    allowNull: true
  },
  gender : DataTypes.STRING,
  dob : DataTypes.DATE,
  height : DataTypes.STRING,
  weight  : DataTypes.STRING,
  physical_activity_level : DataTypes.STRING,
  medical_conditions : DataTypes.STRING,
  allergies :DataTypes.STRING,
  diet_preferences : DataTypes.STRING,
  image:DataTypes.STRING,
  status : DataTypes.TINYINT,
  ban : DataTypes.INTEGER,
  deleted_at : "TIMESTAMP",
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
},
updatedAt: {
    field: 'updated_at',
    type: DataTypes.DATE,
}
});

module.exports = User;