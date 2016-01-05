Router.route('/login', {
  onAfterAction() {
    document.title = 'Login to';
  },
});

const login = {
  events: {
    'submit form'(event) {
      event.preventDefault();
    }
  },

  onRendered() {
    const validator = $('.login').validate({
      submitHandler() {
        Meteor.loginWithPassword(
          $('[name=email]').val(),
          $('[name=password]').val(),
          (error) => {
            if (error) {
              validator.showErrors({
                email: error.reason
              });
            } else {
              if (Router.current().route.getName() === 'login') {
                Router.go('home');
              }
            }
          }
        );
      }
    });
  }
}

if (Meteor.isClient) {
  Template.login.events(login.events);
  Template.login.onRendered(login.onRendered);
}
