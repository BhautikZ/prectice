const express = require("express");
const { get,save} = require("../service/address.service");
const AddressController = express.Router();

AddressController.get("/", async (req, res) => {
  try {
    const _addressResponse = await get();
    console.log(_addressResponse);
    if (_addressResponse.length > 0) {
      res.status(200).send({
        success: true,
        message: "address get successfully!",
        res: _addressResponse,
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
AddressController.post("/", async (req, res) => {
    console.log(req.body);
    const _addressResponse = await save(req.body);
    try {
      if (_addressResponse) {
        res.status(200).send({
          success: true,
          message: "insert record successfuly",
          res: _addressResponse,
        });
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });

module.exports=AddressController;

