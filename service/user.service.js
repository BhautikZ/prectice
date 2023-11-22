const userModel = require("../model/user.model");

const get = async () => {
    return await userModel.find({})

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

const searbyname=async(data)=>{
  console.log('service',data.searchbyname)
   return await userModel.aggregate([{ $match: { name: { $regex: data.searchbyname, $options: 'i' } } }]) 
}
const save = async (data,filename) => {
  console.log('service',filename)
  const user = new userModel({...data,userImage:filename});
  await user.save();
  return user;
};
const recorddelete = async (id) => {
  return await userModel.findByIdAndDelete(id);
};
const updaterecord = async (id, data) => {
  const updaterecord = await userModel.findOneAndUpdate(id, data);
  return updaterecord;
};
const  getdatabyid = async (id) => {
    return await userModel.find({_id:id});
  };
module.exports = {
  get,
  save,
  recorddelete,
  updaterecord,
  getdatabyid,
  searbyname
};
