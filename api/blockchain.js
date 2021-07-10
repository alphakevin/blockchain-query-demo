const path = require('path');
const util = require('util');
const fetch = require('node-fetch');
const DataStore = require('@abtnode/nedb');

const baseDir = process.env.BLOCKLET_DATA_DIR || './';
const filename = 'blockchain-cache.db'

class BlockchainInfo {

  constructor() {
    const dbPath = path.join(baseDir, filename);

    const _db = new DataStore({
      filename: dbPath,
      timestampData: true,
      autoload: true,
    });

    this.db = new Proxy(_db, {
      get(target, property) {
        return util.promisify(target[property]).bind(target);
      },
    });

    this.db.ensureIndex({ fieldName: 'hash', unique: true });
  }

  async fetchRaw(hash) {
    if (!/^[\da-z]{64}/i.test(hash)) {
      throw new TypeError('invalid block hash format');
    }
    const res = await fetch(`https://blockchain.info/rawblock/${hash}`);
    if (res.status !== 200) {
      throw new Error(`fetch blockchain error with code ${res.status}`);
    }
    const data = await res.json();
    return {
      ...data,
      tx: data.tx.map(({ hash }) => ({ hash })),
    }
  }

  async get(hash) {
    let info = await this.db.findOne({ hash });
    if (!info) {
      info = await this.fetchRaw(hash);
      await this.db.insert(info);
    }
    return info;
  }
}

exports.BlockchainInfo = BlockchainInfo;
exports.blockchainInfo = new BlockchainInfo();
