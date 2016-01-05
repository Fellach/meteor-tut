Router.route('/', {
  template: 'home',
  name: 'home',
  onAfterAction() {
    document.title = 'Welcome';
  },
});

const todos = {
  helpers: {
    todo() {
			return Todos.find({listId: this._id, createdBy: Meteor.userId()}, {sort: {createdAt: -1}});
		}
  }
}

if (Meteor.isClient) {
	Template.todos.helpers(todos.helpers);
}
