import { Collection, MongoClient } from 'mongodb';

export const MongoHelper = {
  client: null as unknown as MongoClient,

  async connect(url: string) {
    this.client = await MongoClient.connect(url);
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  },

  async disconnect() {
    this.client.close();
  },
};
