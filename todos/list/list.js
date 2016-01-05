Router.route('/lists/:_id', {
  name: 'list',
  template: 'list',
  onAfterAction() {
    document.title = 'Tasks';
    document.body.className = 'todos';
  },
  data() {
    return Lists.findOne({_id: this.params._id, createdBy: Meteor.userId()});
  },
  onBeforeAction() {
    if (Meteor.userId()) {
      this.next();
    } else {
      this.render('login');
    }
  },
  waitOn() {
    return Meteor.subscribe('todos', this.params._id);
  }
});

const lists = {
  helpers: {
    list() {
      return Lists.find({createdBy: Meteor.userId()}, {sort: {name: 1}});
    }
  },
  onCreated() {
    this.subscribe('lists');
  }
}

if (Meteor.isClient) {
  Template.lists.helpers(lists.helpers);
  Template.lists.onCreated(lists.onCreated);
}
