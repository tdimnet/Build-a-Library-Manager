'use strict';
module.exports = function(sequelize, DataTypes) {
  var Loan = sequelize.define('Loan', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    book_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'A Book ID is required'
        }
      }
    },
    patron_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'A Patron ID is required'
        }
      }
    },
    loaned_on: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          msg: 'A loaned Date is required'
        },
        isDate: {
          msg: 'A loaned Date must be a date'
        }
      }
    },
    return_by: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          msg: 'A Returned Date is required'
        },
        isDate: {
          msg: 'It has to be a Date'
        }
      }
    },
    returned_on: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          msg: 'The returned Date must be here'
        },
        isDate: {
          msg: 'It has to be a date'
        }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.belongsTo(models.Book, { foreignKey: 'book_id' });
        this.belongsTo(models.Patron, { foreignKey: 'patron_id' })
      }
    }
  });
  return Loan;
};
