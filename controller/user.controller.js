const express = require("express");
var multer = require("multer");
const { get, save, recorddelete, updaterecord, getdatabyid ,searbyname} = require("../service/user.service");
const UserController = express.Router();

const userStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  },
});

const uploadUser = multer({ storage: userStorage });

UserController.get("/", async (req, res) => {
  try {
    const _userResponse = await get();
    if (_userResponse.length > 0) {
      res.status(200).send({
        res: _userResponse,
        success: true,
        message: "user get successfully!",
      });
    } else {
      res.status(401).send({
        message: "no record found",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
});
UserController.get("/:id", async (req, res) => {
  try {
    const _userResponse = await getdatabyid(req.params.id);
    if (_userResponse.length > 0) {
      res.status(200).send({
        success: true,
        message: "user getbyid successfully!",
        res: _userResponse,
      });
    } else {
      res.status(401).send({
        message: "no record found",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
});
UserController.delete("/:id", async (req, res) => {
  try {
    const delettrecord = recorddelete(req.params.id);
    if (delettrecord) {
      res.status(200).send({
        success: true,
        message: "user delete successfully!",
        res: delettrecord,
      });
    } else {
      res.status(401).send({
        message: "no record found",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
});
UserController.post("/", uploadUser.single("userImage"), async (req, res) => {
  const _userResponse = await save(req.body,req.file.filename);

  try {
    if (_userResponse) {
      res.status(200).send({
        success: true,
        message: "insert record successfuly",
        res: _userResponse,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
});
UserController.post("/search", async (req, res) => {
  
  console.log(req.body);
  const _userResponse = await searbyname(req.body);
  try {
    if (_userResponse) {
      res.status(200).send({
        success: true,
        message: "search successfully",
        res: _userResponse,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
});
UserController.patch("/:id",uploadUser.single("userImage"),async (req, res) => {
    console.log(req.params.id,req.body)
    try {
      const updatedata = await updaterecord(req.params.id,req.body,req?.file?.filename);
      console.log(updatedata)
      if (updaterecord) {
        res.status(200).send({
          success: true,
          message: "user updated successfully!",
          res: updatedata,
        });
      } else {
        res.status(401).send({
          message: "no record found",
        });
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });
module.exports = UserController;
