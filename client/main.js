import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Images = new Mongo.Collection('images');

Template.images.helpers({
  images:
    Images.find({}, {sort:{rating:-1}})
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
  }
});
