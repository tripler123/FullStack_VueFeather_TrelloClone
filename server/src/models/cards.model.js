// cards-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const cards = new Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    order:{
      type: Number,
      required: true,
      default: 0,
    },
    listId: {
      type: Schema.Types.ObjectId, 
      ref: 'lists'
    },
    boardId: {
      type: Schema.Types.ObjectId, 
      ref: 'boards'
    },
    members: [{
      type: Schema.Types.ObjectId, 
      ref: 'users'
    }],
    archived:{
      type: Boolean,
      required: true,
      default: false,
    },

  }, {
    timestamps: true
  });

  return mongooseClient.model('cards', cards);
};
