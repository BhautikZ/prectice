const express = require("express");
var multer = require("multer");
const {
  get,
  save,
  recorddelete,
  updaterecord,
  getdatabyid,
  searbyname,
  userLogin,
} = require("../service/user.service");
const crypto = require("crypto-js");
const UserController = express.Router();
const jwt = require("jsonwebtoken");
const fs = require("fs");
const userModel = require("../model/user.model");

const userStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  },
});

const decryptedPassword = (data) => {
  const decryptedEnteredPassword = crypto.AES.decrypt(
    data,
    "secret key 123"
  ).toString(crypto.enc.Utf8);
  return decryptedEnteredPassword;
};

const uploadUser = multer({ storage: userStorage });

UserController.get("/", async (req, res) => {
  try {
    const _userResponse = await get();
    console.log(_userResponse);
    if (_userResponse.length > 0) {
      res.status(200).send({
        res: _userResponse,
        //res: _userResponse.data,totalpage:_userResponse.totalpages,
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
  const existingUser = await userModel.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }
  try {
    const _userResponse = await save(req.body, req.file.filename);
    if (_userResponse) {
      res.status(200).send({
        success: true,
        message: "signup successfuly",
        res: _userResponse,
      });
    }
  } catch (error) {
    const filePath = "public/images/" + req.file.filename;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", filePath, err);
      } else {
        console.log("file delete successfully");
      }
    });
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
UserController.post("/login", async (req, res) => {
  const _userResponse = await userLogin(req.body.email);
  try {
    const data = {
      time: Date(),
      userId: _userResponse._id,
    };
    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30m",
    });
    if (_userResponse) {
      console.log(_userResponse);
      if (req.body.password !== decryptedPassword(_userResponse[0].password)) {
        return res
          .status(400)
          .json({ error: "password don't match" });
      }
      res.status(200).send({
        success: true,
        message: "login successfully",
        res: _userResponse,
        accessToken: accessToken,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
});

UserController.patch(
  "/:id",
  uploadUser.single("userImage"),
  async (req, res) => {
    console.log(req.params.id, req.body);
    try {
      const updatedata = await updaterecord(
        req.params.id,
        req.body,
        req?.file?.filename
      );
      console.log(updatedata);
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
  }
);
module.exports = UserController;
