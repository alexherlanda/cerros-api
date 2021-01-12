// DEBUG=app:* node scripts/teamSeeds.js

const chalk = require("chalk");
const debug = require("debug")("app:scripts:teamSeeds");
const MongoLib = require("../lib/MongoLib");

const volunteers = [
  {
    name: "Name Name Name",
    roleDescription: "Lider Técnico",
    background: "Code",
    axis: 1,
    birthDate: "08/06/1973",
    nationality: "MX",
    locationCity: "CDMX",
    locationCountry: "mx",
    occupation: "Empleado",
    email: "code@yopmail.com",
    admissionDate: "22/05/2020",
    exitDate: null,
    imageURL: "https://live.some.com/65535/50800739818_baae417d1e.jpg",
  },
];

async function seedEvents() {
  try {
    const mongoDB = new MongoLib();
    const promises = volunteers.map(async (member) => {
      await mongoDB.createOne("volunteers", member);
    });
    await Promise.all(promises);
    debug(chalk.green(`${promises.length} team members have been created succesfully`)); // prettier-ignore
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
  return process.exit(0);
}

seedEvents();
