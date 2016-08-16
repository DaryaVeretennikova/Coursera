import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../collections.js';
import '../methods/addEditingUser.js';

Template.editor.helpers({
  docid: function() {
    var doc = Documents.findOne();

    if (doc) {
      return doc._id;
    } else {
      return undefined;
    }
  },
  config: function() {
    return function(editor) {
      editor.setOption('lineNumbers', true);
      editor.setOption('theme', 'dracula');
      
      editor.on('change', function(cm_editor, info) {
        $('#viewer_iframe')
          .contents()
          .find('html')
          .html(cm_editor.getValue());
        Meteor.call('addEditingUser');
      });
    };
  }
});

Template.editingUsers.helpers({
  users: function() {
    var doc = Documents.findOne();
    var users = [];
    var i = 0;
    var eUsers;

    if (!doc) {
      return;
    }

    eUsers = EditingUsers.findOne({docid: doc._id});

    if (!eUsers) {
      return;
    }

    for (var user_id in eUsers.users) {
      users[i] = eUsers.users[user_id];
      i++;
    }

    return users;
  }
});
