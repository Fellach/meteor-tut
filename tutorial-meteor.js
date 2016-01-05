Router.configure({
  layoutTemplate: 'main',
  loadingTemplate: 'loading'
});

if (Meteor.isClient) {
  Template.navigation.events({
    'click .logout'(event) {
      event.preventDefault();
      Meteor.logout();
      Router.go('login');
    }
  });
}
