const express = require("express");
var multer = require("multer");
const { save } = require("../service/image.service");
const imageController = express.Router();

const imageStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "public/multiimg/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  },
});
const uploadimage = multer({ storage: imageStorage });

imageController.delete("/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = "public/multiimg/" + filename;

  // Use the file system module to delete the file
  const fs = require("fs");
  fs.unlink(filePath, (err) => {
    console.log('filepath',filePath)
    if (err) {
      res.status(500).send({
        success: false,
        error: "Error deleting file: " + err.message,
      });
    } else {
      res.status(200).send({
        success: true,
        message: "File deleted successfully",
      });
    }
  });
});

imageController.post("/", uploadimage.array("images", 5), async (req, res) => {
  const _userResponse = await save(req.files);
  try {
    if (_userResponse) {
      res.status(200).send({
        success: true,
        message: "insert record successfuly",
        res: _userResponse,
      });
    }
  } catch (error) {
    // Delete uploaded files if an error occurs
    req.files.forEach((file) => {
      const filePath = "public/multiimg/" + file.filename;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", filePath, err);
        }
      });
    });

    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
});
module.exports = imageController;
