import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../collections.js';
/* import methods */
import '../methods/addEditingUser.js';
import '../methods/addDoc.js';

Template.editor.helpers({
    docid: function() {
        setupCurrentDocument();

        return Session.get('docid');
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

        eUsers = EditingUsers.findOne({
            docid: doc._id
        });

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

/* --------- Events --------- */

Template.navbar.events({
    'click .j-add-doc': function(e) {
        e.preventDefault();
        console.log('add new doc');

        if (!Meteor.user) { //user not available
            alert('You need to login first!');
        } else { //let the logged in user create a doc
            var id = Meteor.call('addDoc', function(err, res) {
                if (!err) {
                    Session.set('docid', res);
                }
            });

            console.log('get an id back', id);

        }
    }
});

/* --------- Functions --------- */
function setupCurrentDocument() {
    var doc;
    if (!Session.get('docid')) { //no doc id set yet
        doc = Documents.findOne();

        if (doc) {
            Session.set('docid', doc._id);
        }
    }
}
