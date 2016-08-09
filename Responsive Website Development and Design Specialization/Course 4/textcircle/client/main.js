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
  },
  config: function() {
    return function(editor) {
      editor.on('change', function(cm_editor, info) {
        $('#viewer_iframe')
          .contents()
          .find('html')
          .html(cm_editor.getValue());
      });
    };
  }
});
