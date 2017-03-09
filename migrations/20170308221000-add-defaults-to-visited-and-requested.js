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

exports.up = function(db, callback) {
  db.changeColumn(
    'urls',
    'visited',
    {defaultValue: 0},
    callback
    );
  db.changeColumn(
    'urls',
    'requested',
    {defaultValue: 0}, 
    callback
    );
};

exports.down = function(db, callback) {
  db.changeColumn(
    'urls',
    'visited',
    {defaultValue: null},
    callback
    );
  db.changeColumn(
    'urls',
    'requested',
    {defaultValue: null},
    callback
  );
};

exports._meta = {
  'version': 1
};
