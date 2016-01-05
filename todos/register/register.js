Router.route('/register', {
  onAfterAction() {
    document.title = 'Register';
  },
});

const register = {
  events: {
    'submit form'(event) {
      event.preventDefault();
    }
  },

  onRendered() {
    const validator = $('.register').validate({
      rules: {
        password: {
          required: true,
          minlength: 6,
        },
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        email: {
          required: "You must enter an email address."
        }
      },
      submitHandler() {
        let email = $('[name=email]').val();
        let password = $('[name=password]').val();

        Accounts.createUser(
          {
            email,
            password
          },
          (error) => {
            if (error) {
              validator.showErrors({
                email: error.reason
              });
            } else {
              Router.go('home');
            }
          }
        );
      }
    });
  }
};

if (Meteor.isClient) {
  Template.register.events(register.events);
  Template.register.onRendered(register.onRendered)
}
