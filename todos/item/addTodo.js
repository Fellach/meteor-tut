const addTodo = {
  events: {
    'submit form'(event) {
      event.preventDefault();
      let $todoName = $('[name="todoName"]');
      Meteor.call('createListItem', $todoName.val(), this._id, (error) => {
          $todoName.val('');
          $(event.target).blur();
      });
    }
  },

  methods: {
    createListItem(name, listId) {
      check(name, String);
      check(listId, String);

      const createdBy = Meteor.userId();

      if (!createdBy) {
        throw new Meteor.Error('not-logged-in', 'You are not logged-in.');
      }
      if (Lists.findOne(listId).createdBy !== createdBy) {
        throw new Meteor.Error('invalid-user', 'You do not own that');
      }

      return Todos.insert({
        name,
        completed: false,
        createdAt: new Date(),
        listId,
        createdBy,
      });
    }
  }
};

if (Meteor.isClient) {
  Template.addTodo.events(addTodo.events);
}

if (Meteor.isServer) {
  Meteor.methods(addTodo.methods);
}
