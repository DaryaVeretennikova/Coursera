Meteor.methods({
  addEditingUser: function() {
    var doc;
    var user;
    var eUsers;

    doc = Documents.findOne();
    
    if (!doc) { //no doc
      return;
    }

    if (!this.userId) { //no logged in user
      return;
    }

    user = Meteor.user().profile;
    eUsers = EditingUsers.findOne({ docid: doc._id });

    if (!eUsers) {
      eUsers = {
        docid: doc._id,
        users: {}
      }
    }

    user.lastEdit = new Date();
    eUsers.users[this.userId] = user;

    EditingUsers.upsert(
      {_id: eUsers._id},
      eUsers
    );
  }
});
