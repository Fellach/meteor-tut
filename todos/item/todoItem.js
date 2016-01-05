const todoItem = {
  events: {
    'click .delete-todo'(event) {
      event.preventDefault();

      if (window.confirm(`Are you sure you want to remove the '${this.name}'?`)) {
        Meteor.call('removeListItem', this._id);
      }
    },

    'keyup [name="todoItem"]'(event) {
      let $target = $(event.target);

      if (event.which === 13 || event.which === 27) {
        $target.blur();
      }

      Meteor.call('updateListItem', this._id, $target.val())
    },

    'change [type="checkbox"]' (event) {
      Meteor.call('changeItemStatus', this._id, !this.completed);
    }
  },

  helpers: {
    checked() {
      return this.completed ? 'checked' : '';
    }
  },

  methods: {
    updateListItem(_id, name) {
      check(_id, String);
      check(name, String);

      const createdBy = Meteor.userId();

      if (!createdBy) {
        throw new Meteor.Error('not-logged-in', 'You are not logged-in.');
      }

      Todos.update({_id, createdBy}, {$set: {name}});
    },

    changeItemStatus(_id, completed) {
      check(_id, String);

      const createdBy = Meteor.userId();

      if (!createdBy) {
        throw new Meteor.Error('not-logged-in', 'You are not logged-in.');
      }

      Todos.update({_id, createdBy}, {$set: {completed}});
    },

    removeListItem(_id) {
      check(_id, String);

      const createdBy = Meteor.userId();

      if (!createdBy) {
        throw new Meteor.Error('not-logged-in', 'You are not logged-in.');
      }

      Todos.remove({_id, createdBy});
    }
  }
};

if (Meteor.isClient) {
  Template.todoItem.helpers(todoItem.helpers);
  Template.todoItem.events(todoItem.events);
}

if (Meteor.isServer) {
  Meteor.methods(todoItem.methods);
}
