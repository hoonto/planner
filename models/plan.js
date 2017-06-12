'use strict'

module.exports = function (sequelize, DataTypes) {
  var Plans = sequelize.define('plans', {
    id: {
      type: DataTypes.TEXT,
      primaryKey: true
    },
    title: {
      allowNull: false,
      type: DataTypes.TEXT,
      description: 'Plan\'s Description'
    },
    duedate: {
      type: DataTypes.TEXT,
      description: 'Plan\'s Due Date'
    },
    meta: {
      type: DataTypes.TEXT
    },
    type: {
      type: DataTypes.TEXT
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW
    }
  })

  return Plans
}
