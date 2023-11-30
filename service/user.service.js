const userModel = require("../model/user.model");
const crypto = require("crypto-js");
const fs = require("fs");

const get = async () => {
  //const data= await userModel.find({}).populate("AddressId")

  const data = await userModel.aggregate([
    {
      $lookup: {
        from: "addresses",
        localField: "AddressId",
        foreignField: "_id",
        as: "address_details",
      },
    },
    {
      $unwind: "$address_details", // Unwind the array created by $lookup
    },
    {
      $project: {
        name: 1,
        email: 1,
        age: 1,
        "address_details.userfullAddress": 1,
      },
    },
  ]);
  //console.log(data,'data')
  return data;
  //pagination and becryp encrypt
  // const pageSize = 5; // Number of documents per page
  // const page = 1; // Page number you want to retrieve

  // // Calculate the number of documents to skip based on the page size and current page
  // const totalCount = await userModel.countDocuments({});

  // // Calculate the total number of pages
  // const totalPages = Math.ceil(totalCount / pageSize);
  // const skip = (page - 1) * pageSize;

  // const data = await userModel.find({}).skip(skip).limit(pageSize);
  // if (data && data.length > 0) {
  //   data.forEach((user) => {
  //     if (user.password) {
  //       var bytes = crypto.AES.decrypt(user.password, "secret key 123");
  //       var originalText = bytes.toString(crypto.enc.Utf8);
  //       user.password = originalText;
  //     }
  //   });
  //   const proccessData =
  //     {
  //       data,
  //       totalpages: totalPages,
  //     }

  //   return proccessData;
  // } else {
  //   // Handle the case when no data is found
  //   return null; // or any other appropriate response
  // }
  //find whose gender male using aggregate
  //return await userModel.aggregate([{$match:{gender:"male"}}]);

  //create group using user age using aggregate
  //return await userModel.aggregate([{$group:{_id:"$age"}}]);

  //create group using age and display name like whose age is 22
  //return await userModel.aggregate([{$group:{_id:"$age",name:{$push:"$name"}}}]);

  //display all information of user using age group aggregate
  //return await userModel.aggregate([{$group:{_id:"$age",allinfo:{$push:"$$ROOT"}}}]);

  //display all male and count the total male in each group
  //return await userModel.aggregate([{$match:{gender:"male"}},{$group:{_id:"$age",name:{$push:"$name"},count:{$sum:1}}}]);

  //sort by using count
  // return await userModel.aggregate([{$match:{gender:"male"}},
  // {$group:{_id:"$age",name:{$push:"$name"},count:{$sum:1}}},
  // {$sort:{count:-1}}]);

  //find max in group and add one group mence whisw group members is greter
  //   return await userModel.aggregate([{$match:{gender:"male"}},
  //   {$group:{_id:"$age",name:{$push:"$name"},count:{$sum:1}}},
  //   {$sort:{count:-1}},
  //   {$group:{_id:null,maxnumberofgroup:{$max:"$count"}}}
  // ]);

  //unwind opratotrs
  //return await userModel.aggregate([{$unwind:"$hobbies"}]);

  //find number of student in per each hobbies
  //return await userModel.aggregate([{$unwind:"$hobbies"},{$group:{_id:"$hobbies",count:{$sum:1},names:{$push:"$name"}}}])

  //find average of age
  // if in _id filed pass as a null that meance all group in convert into single document
  //return await userModel.aggregate([{$group:{_id:null,averageofage:{$avg:"$age"}}}])

  //find total number of hobbies
  //1)
  //return await userModel.aggregate([{$unwind:"$hobbies"},{$group:{_id:null,sumoftotalhobies:{$sum:1}}}]);

  //list of total  hobbies
  //push is return if dubllicate is present return it but if use addToSet then its not return dubllicate array
  // return await userModel.aggregate([{$unwind:"$hobbies"},
  // {$group:{_id:null,hobbies:{$push:"$hobbies"}}}])

  //find average of scror of each user
  //using fillter
  // return await userModel.aggregate([{
  //    $group:{
  //        _id:null,
  //        averagescror:{
  //         $avg:{
  //            $filter:{
  //              input:"$score",
  //              as:"score",
  //              cond:{$gt:["$age",20]}
  //            }
  //         }
  //        }
  //    }
  // }])
  //using match
  //   return await userModel.aggregate([
  //     {
  //       $match: {
  //         age: { $gt: 20 }
  //       }
  //     },
  //     {
  //       $group: {
  //         _id: null,
  //         averagescore: {
  //           $avg: "$score"
  //         }
  //       }
  //     }
  //   ]);
};

const searbyname = async (data) => {
  return await userModel.aggregate([
    { $match: { name: { $regex: data.searchbyname, $options: "i" } } },
  ]);
};
const userLogin = async (email) => {
  //return await userModel.find({email:email})
  return userModel.aggregate([
    {
      $match:{email:email}
    },
    {
      $lookup: {
        from: "addresses",
        localField: "AddressId",
        foreignField: "_id",
        as: "address_details",
      },
    },
    {
      $unwind: "$address_details", // Unwind the array created by $lookup
    },
    {
      $project: {
        name: 1,
        email: 1,
        age: 1,
        password:1,
        "address_details.userfullAddress": 1,
      },
    },
  ]);
};
const save = async (data, filename) => {
  const encryptedString = crypto.AES.encrypt(
    data.password,
    "secret key 123"
  ).toString();

  try {
    const user = new userModel({
      ...data,
      userImage: filename,
      password: encryptedString,
    });
    await user.save();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
const recorddelete = async (id) => {
  return await userModel.findByIdAndDelete(id);
};
const updaterecord = async (id, data, filename) => {
  try {
    const findbyid = await userModel.findById(id);

    if (!findbyid) {
      throw new Error("Record not found");
    }
    if (filename && filename !== undefined) {
      // Delete the old image file
      const filePath = "public/images/" + findbyid.userImage;
      console.log(filePath, "filepath");
      fs.unlink(filePath, async (err) => {
        if (err) {
          console.error("Error deleting file:", findbyid.userImage, err);
          throw new Error("Error deleting old image file");
        } else {
          console.log("File deleted successfully");
        }
      });
      const updaterecord = await userModel.findByIdAndUpdate(
        id,
        { ...data, userImage: filename },
        {
          new: true, // Return the modified document rather than the original
        }
      );
      return updaterecord;
    } else {
      // Update the record with new data
      const updaterecord = await userModel.findByIdAndUpdate(
        id,
        { ...data, userImage: filename },
        {
          new: true, // Return the modified document rather than the original
        }
      );

      return updaterecord;
    }
  } catch (error) {
    console.error("Error updating record:", error.message);
    throw error; // Re-throw the error to be handled by the calling function or middleware
  }
};
const getdatabyid = async (id) => {
  return await userModel.find({ _id: id });
};
module.exports = {
  get,
  save,
  recorddelete,
  updaterecord,
  getdatabyid,
  searbyname,
  userLogin,
};
