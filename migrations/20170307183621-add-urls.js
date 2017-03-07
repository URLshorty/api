'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = (db, callback) => {
  db.createTable('urls', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    original: 'string',
    shortened: 'string',
    visited: 'int',
    requested: 'int',
    created_at: 'timestamp',
    updated_at: 'timestamp',
  }, callback);
};

exports.down = (db, callback) => {
  db.dropTable('urls', callback);
};

exports._meta = {
  "version": 1
};
