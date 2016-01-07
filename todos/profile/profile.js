Router.route('/profile', {
  onAfterAction() {
    document.title = 'Profile';
  },
  onBeforeAction() {
    if (Meteor.userId) {
      this.next();
    } else {
      Router.go('login');
    }
  }
});

const profile = {
  events: {
    'submit form'(event) {
      event.preventDefault();
    }
  },

  onRendered() {
    const validator = $('.profile').validate({
      submitHandler() {
        Accounts.changePassword(
          $('[name=old]').val(),
          $('[name=new]').val(),
          (error) => {
            if (error) {
              validator.showErrors({
                'old': error.reason === 'Incorrect password' ? error.reason : '',
                'new': error.reason === 'Incorrect password' ? '' : error.reason,
              });
            } else {
              Router.go('home');
            }
          }
        )
      }
    });
  }
};

if (Meteor.isClient) {
  Template.profile.events(profile.events);
  Template.profile.onRendered(profile.onRendered);
}
