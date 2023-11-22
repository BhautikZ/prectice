const AddressModel = require("../model/address.model");

const get = async () => {
  return await AddressModel.find({})
};
const save = async (data) => {
    const Address = new AddressModel(data);
    await Address.save();
    return Address;
  };

module.exports={
    get,
    save
}

