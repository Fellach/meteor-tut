const todosCount = {
  helpers: {
    total() {
      return Todos.find({listId: this._id}).count();
    },
    completed() {
      return Todos.find({listId: this._id, completed: true}).count();
    }
  }
};

if (Meteor.isClient) {
  Template.todosCount.helpers(todosCount.helpers);
}
