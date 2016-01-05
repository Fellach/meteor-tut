Todos = new Mongo.Collection('todos');

Lists = new Mongo.Collection('lists');


if (Meteor.isServer) {
  Meteor.publish('lists', function() {
    return Lists.find({createdBy: this.userId});
  });

  Meteor.publish('todos', function(currentList) {
    return Todos.find({createdBy: this.userId, listId: currentList})
  });
}
