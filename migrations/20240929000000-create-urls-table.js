'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable('urls', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    original_url: { type: 'string', notNull: true },
    short_code: { type: 'string', notNull: true, unique: true },
    created_at: { type: 'timestamp', notNull: true, defaultValue: new String('CURRENT_TIMESTAMP') }
  });
};

exports.down = function (db) {
  return db.dropTable('urls');
};

exports._meta = {
  "version": 1
};
