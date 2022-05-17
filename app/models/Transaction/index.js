const mongoose = require('mongoose');
const Transaction = mongoose.model('transactions');

/**
 * BASIC C(reate)R(ead)U(pdate)D(elete)
 */
exports.read = () => {
  return new Promise((resolve, reject) => {
    Transaction.find({}).exec((err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};
exports.readSelected = (toPopulate) => {
  return new Promise((resolve, reject) => {
    Transaction.find()
      .populate(toPopulate)
      .exec((err, result) => {
        err ? reject(err) : resolve(result);
      });
  });
};
exports.create = (transaction) => {
  return new Promise((resolve, reject) => {
    const mockTransaction = new Transaction(transaction);
    mockTransaction.save((err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};
exports.createAndPopulate = (transaction) => {
  return new Promise((resolve, reject) => {
    const mockTransaction = new Transaction(transaction);
    mockTransaction.save((err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};
exports.update = (condition, query, options = {}) => {
  return new Promise((resolve, reject) => {
    Transaction.findOneAndUpdate(condition, query, options).exec(
      (err, result) => {
        err ? reject(err) : resolve(result);
      }
    );
  });
};
exports.updateAndPopulate = (query, data, options = {}, toPopulate = []) => {
  return new Promise((resolve, reject) => {
    Transaction.findOneAndUpdate(query, data, options)
      .populate(toPopulate)
      .exec((err, result) => {
        err ? reject(err) : resolve(result);
      });
  });
};
/**
 * @description Method to Delete a Document in a Collection
 * @param {Object} query
 */
exports.delete = (query) => {
  return new Promise((resolve, reject) => {
    Transaction.findOneAndDelete(query).exec((err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

exports.deleteMany = (query) => {
  return new Promise((resolve, reject) => {
    Transaction.deleteMany(query).exec((err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

/**
 * Methods
 */
/**
 * @description Method to Read Collection By Key
 * @param {Object} query
 */
exports.readByKey = (query) => {
  return new Promise((resolve, reject) => {
    Transaction.find(query).exec((err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};
/**
 * @description Method to Read By Key, with Population Control and Select Control
 * @param {Object} query
 * @param {Array} toPopulate
 * @param {Object} toSelect
 */
exports.readSelectedByKey = (query, toPopulate = [], toSelect = []) => {
  return new Promise((resolve, reject) => {
    Transaction.find(query)
      .populate(toPopulate)
      .select(toSelect.join(' '))
      .exec((err, result) => {
        err ? reject(err) : resolve(result);
      });
  });
};

/**
 * Read One By Key
 */
exports.readOneByKey = (query, toPopulate = [], toSelect = []) => {
  return new Promise((resolve, reject) => {
    Transaction.findOne(query)
      .populate(toPopulate)
      .select(toSelect.join(' '))
      .exec((err, result) => {
        err ? reject(err) : resolve(result);
      });
  });
};

/**
 * @description - update many objects matching a condition.
 * @param {Object} query - condition to update objects.
 * @param {Object} doc - new values object.
 */
exports.updateManyObjects = (query = {}, doc, options = {}) => {
  return new Promise((resolve, reject) => {
    Transaction.updateMany(query, doc, options).exec((err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

exports.countDocuments = (query) =>
  new Promise((resolve, reject) =>
    Transaction.countDocuments(query).exec((err, result) =>
      err ? reject(err) : resolve(result)
    )
  );

/**
 *  Aggregate query.
 */
exports.aggregateQuery = (aggregateQuery) => {
  return new Promise((resolve, reject) => {
    Transaction.aggregate(aggregateQuery)
      .read('s', [{ usage: 'reporting' }])
      .exec((err, result) => {
        err ? reject(err) : resolve(result);
      });
  });
};
