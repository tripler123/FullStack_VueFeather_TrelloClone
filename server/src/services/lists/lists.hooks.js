const { authenticate } = require('@feathersjs/authentication').hooks;
const mongoose = require('mongoose');

async function isBoardId(context){
  const { boardId } = context.params.query;
  const { _id } = context.params.user;

  const boards = mongoose.model('boards');
  const board = await boards.findOne({ _id: boardId});

  if(board){
    if(board.ownerId.toString() == _id.toString()){
      return context;
    } 
    else {
      return Promise.reject(new Error('Un-Authorized'));
    }
  }

  return context;
}

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [ isBoardId ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
