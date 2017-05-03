var express = require('express');
var mongoose = require('../config').mongoose;
var Schema = mongoose.Schema;

var data_notes_Schema = Schema({
  user_id: {
    type: String
  },
  title: {
    type: String
  },
  take_note: {
    type:String
  }
});


data_notes_Schema.statics.save_data = function(request,data_number, cb) {
  console.log("save_data");
  console.log("decode",data_number._id);
  var note_detail = new this({
    user_id: data_number._id,
    title: request.title,
    take_note: request.take_note
  })

  note_detail.save(cb);
  console.log("executed");

}

data_notes_Schema.statics.get_data = function(user_id, cb) {

  console.log("get_data");
  this.find({user_id:user_id}, cb);
}


data_notes_Schema.statics.update_data_notes = function(request, cb) {

  console.log("update_data");
  this.update({
    _id:request._id
  },{
    $set:{
      title:request.title,
      take_note:request.take_note
    }
  },cb);
}

data_notes_Schema.statics.deletes_data_notes = function(request, cb) {
  console.log("delete data");
  this.remove({_id:request._id},cb);
}


var dataSchema = mongoose.model('note_data', data_notes_Schema);



module.exports = dataSchema;
