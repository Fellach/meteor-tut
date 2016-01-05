Router.route('/bye', {
  template: 'bye',
  onAfterAction: function() {
    document.title = 'bye';
    document.body.className = 'bye';
  }
});

if (Meteor.isClient) {
  
  Template.bye.helpers({
    title: function () {
      return 'abc';
    }
  });

  Template.bye.events({
    'click button': function () {
      alert('clicked');
      
    }
  });

  
}