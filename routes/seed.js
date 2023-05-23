const express = require("express");
const seedDatabase = require("../seed/gifsSeed");
const seedRouter = express.Router();

seedRouter.get("/", seedDatabase);

module.exports = seedRouter;
