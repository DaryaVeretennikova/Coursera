import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('welcome', {
    to: 'main'
  });
});

Router.route('/images', function () {
  this.render('navbar', {
    to: 'navbar'
  });
  this.render('images', {
    to: 'main'
  });
});

Router.route('/image/:_id', function () {
  this.render('navbar', {
    to: 'navbar'
  });
  this.render('image', {
    to: 'main',
    data: function() {
      return Images.findOne({_id: this.params._id});
    }
  });
});


Session.set('imageLimit', 8);

lastScrollTop = 0;

$(window).scroll(function(e) {
    //test if we are at the bottom

    if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        //test if we scroll down
        var scrollTop = $(this).scrollTop();

        if (scrollTop > lastScrollTop) {
            Session.set('imageLimit', Session.get('imageLimit') + 4);
        } else {

        }

        lastScrollTop = scrollTop;

    }


});

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Template.images.helpers({
    images: function() {
        if (Session.get('userFilter')) {
            return Images.find({ createdBy: Session.get('userFilter') }, { sort: { createdOn: -1, rating: -1 } });
        } else {
            return Images.find({}, { sort: { createdOn: -1, rating: -1 }, limit: Session.get('imageLimit') });
        }
    },

    getUser: function(user_id) {
        var user = Meteor.users.findOne({ _id: user_id });

        if (user) {
            return user.username;
        } else {
            return 'anonymous';
        }
    },
    getFilterUser: function() {
        if (Session.get('userFilter')) {
            var user = Meteor.users.findOne({ _id: Session.get('userFilter') });
            return user.username;
        } else {
            return false;
        }
    },
    filtering_images: function() {
        if (Session.get('userFilter')) {
            return true;
        } else {
            return false;
        }
    }
});


Template.body.helpers({
    username: function() {
        if (Meteor.user()) {
            return Meteor.user().username;
        } else {
            return 'anonymous';
        }
    }
});

Template.images.events({
    'click .js-image': function(e) {
        $(e.target).css({
            width: '50px'
        });
    },
    'click .js-del-image': function(e) {
        var image_id = this._id;
        $('#' + image_id).hide('slow', function() {
            Images.remove({ '_id': image_id });
        });
    },
    'click .js-rate-image': function(e) {
        var rating = $(e.currentTarget).data('userrating');
        var image_id = this.id;
        Images.update({ '_id': image_id }, { $set: { 'rating': rating } });
    },
    'click .js-show-image-form': function(e) {
        $('#image_add_form').modal('show');
    },
    'click .js-set-image-filter': function(e) {
        Session.set('userFilter', this.createdBy);
    },
    'click .js-unset-image-filter': function(e) {
        Session.set('userFilter', undefined);
    }
});

Template.image_add_form.events({
    'submit .js-add-image': function(e) {
        var img_src;
        var img_alt;

        img_src = event.target.img_src.value;
        img_alt = event.target.img_alt.value;

        if (Meteor.user()) {
            Images.insert({
                img_src: img_src,
                img_alt: img_alt,
                createdOn: new Date(),
                createdBy: Meteor.user()._id
            });
        }

        $('#image_add_form').modal('hide');

        return false;
    }
});
