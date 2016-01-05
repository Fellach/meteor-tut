const addList = {
  events: {
    'submit form'(event) {
      event.preventDefault();
      let $listName = $('[name=listName]');
      Meteor.call('createNewList', $listName.val(), (error, results) => {
        if (!error) {
          Router.go('list', {_id: results});
          $listName.val('');
        }
      });
    }
  },

  methods: {
    createNewList(listName) {
      check(listName, String);

      if (!listName) {
        listName = 'Untitled';
      }

      const currentUser = Meteor.userId();

      if (!currentUser) {
        throw new Meteor.Error('not-logged-in', 'You are not logged-in.');
      }

      return Lists.insert({
        name: listName,
        createdBy: currentUser
      });
    }
  }
}

if (Meteor.isClient) {
  Template.addList.events(addList.events);
}

if (Meteor.isServer) {
  Meteor.methods(addList.methods);
}
