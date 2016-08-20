import { Meteor } from 'meteor/meteor';
import '../collections.js';

Meteor.startup(() => {
    if (!Documents.findOne()) { //no documents yet
        Documents.insert({
            title: 'new document'
        });
    }
});
