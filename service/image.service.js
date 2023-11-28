const imageModel = require("../model/images.model");

const save = async (data) => {
    const fileNames = data.map(file => file.filename);
    const dataimage={
        image1:fileNames[0],
        image2:fileNames[1],
        image3:fileNames[2],
        image4:fileNames[3],
        image5:fileNames[4]
    }
    const Image = new imageModel(dataimage);
    await Image.save();
    return Image;
  };

module.exports={
    save
}
