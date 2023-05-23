const GIF = require("../models/Gif");
const { uploadImage } = require("../cloudinary/cloudinary");
const fs = require("fs-extra");

const getAll = async (req, res) => {
  try {
    const gifs = await GIF.find({}).limit(36).sort({ createdAt: -1 }).exec();

    return res.status(200).json({ ok: true, gifs });
  } catch (error) {
    return res
      .status(503)
      .json({ ok: false, msg: "Something bad happened..." });
  }
};

const getGifById = async (req, res) => {
  const { id } = req.params;
  try {
    const gif = await GIF.findOne({ _id: id });

    return res.status(200).json({ ok: true, gif });
  } catch (error) {
    return res
      .status(503)
      .json({ ok: false, msg: "Something bad happened..." });
  }
};

const uploadGifFromUrl = async (req, res) => {
  const { title, url, owner, tag } = req.body;

  try {
    if (title && url && owner && tag) {
      const gif = new GIF(req.body);
      await gif.save();

      return res.status(203).json({
        ok: true,
        gif,
      });
    }
  } catch (error) {
    return res
      .status(503)
      .json({ ok: false, msg: "Something bad happened..." });
  }
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    await GIF.findOneAndDelete({ _id: id });

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res
      .status(503)
      .json({ ok: false, msg: "Something bad happened..." });
  }
};

const uploadGifFromLocal = async (req, res) => {
  const { title, owner, tag } = req.body;

  try {
    const resultImage = await uploadImage(req.file.path);

    const gif = new GIF({
      title,
      owner,
      tag,
      url: resultImage.secure_url,
    });

    await fs.unlink(req.file.path);
    await gif.save();

    return res.status(201).json({
      ok: true,
      gif,
    });
  } catch (error) {
    console.log(error)
    return res
      .status(503)
      .json({ ok: false, msg: "Something bad happened..." });
  }
};

module.exports = {
  getAll,
  getGifById,
  deleteById,
  uploadGifFromUrl,
  uploadGifFromLocal,
};
