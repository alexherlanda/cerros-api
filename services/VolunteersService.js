const MongoLib = require("../lib/MongoLib");

class VolunteersService {
  constructor() {
    this.collection = "volunteers";
    this.mongoDB = new MongoLib();
  }

  async addOneVolunteer() {}

  async updateOneVolunteer() {}

  async deleteOneVolunteer() {}

  async findVolunteers(query = {}) {
    const results = await this.mongoDB.findByQuery(this.collection, query);
    return results;
  }
}

module.exports = { VolunteersService };
