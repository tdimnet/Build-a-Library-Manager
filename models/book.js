'use strict';
module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define('Book', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'A title is required'
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'An author is required'
        }
      }
    },
    genre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'A genre is required'
        }
      }
    },
    first_published: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.hasMany(models.Loan, { foreignKey: 'book_id' });
      }
    },
    timestamps: false
  });
  return Book;
};
