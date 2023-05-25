const mongoose = require("mongoose");

const GIF = require("../models/Gif");
const art = require("./data/art");
const music = require("./data/music");
const dance = require("./data/dance");

const seedDatabase = async () => {
  try {
    await GIF.deleteMany({});
    const artDataToSeed = art.data.map((gif) => {
      return {
        title: gif.title,
        url: gif.images.original.url,
        tag: "art",
      };
    });

    await GIF.insertMany(artDataToSeed);

    const musicDataToSeed = music.data.map((gif) => {
      return {
        title: gif.title,
        url: gif.images.original.url,
        tag: "music",
      };
    });

    await GIF.insertMany(musicDataToSeed);

    const danceDataToSeed = dance.data.map((gif) => {
      return {
        title: gif.title,
        url: gif.images.original.url,
        tag: "dance",
      };
    });

    await GIF.insertMany(danceDataToSeed);

    console.log("Database seeded successfully");
    mongoose.disconnect();
  } catch (err) {
    console.error("Error seeding the database:", err);
    mongoose.disconnect();
  }
};

module.exports = seedDatabase;
