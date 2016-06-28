import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Images = new Mongo.Collection('images');

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Template.images.helpers({
  images:
    Images.find({}, {sort:{createdOn: -1, rating:-1}}),
    getUser: function (user_id){
      var user = Meteor.users.findOne({_id: user_id});

      if (user) {
        return user.username;
      } else {
        return 'anonymous';
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
      Images.remove({'_id': image_id});
    });
  },
  'click .js-rate-image': function(e) {
    var rating = $(e.currentTarget).data('userrating');
    var image_id = this.id;
    Images.update({'_id': image_id}, {$set: {'rating': rating}});
  },
  'click .js-show-image-form': function(e) {
    $('#image_add_form').modal('show');
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
