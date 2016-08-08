import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../collections.js';

Template.editor.helpers({
  docid: function() {
    var doc = Documents.findOne();

    if (doc) {
      return doc._id;
    } else {
      return undefined;
    }
  }
});

Template.date_display.helpers({
  current_date: function() {
    return Session.get('current_date');
  }
});

Meteor.setInterval(function() {
  Session.set('current_date', new Date());
}, 1000);
