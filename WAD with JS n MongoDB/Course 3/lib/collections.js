Images = new Mongo.Collection('images');

//set up security on Images collection
Images.allow({
  insert: function(userId, doc) {
    console.log('testing security');
    //if is logged in
    if (Meteor.user()) {
      //test if the image is owned by the user
      if (userId !== doc.createdBy) {
        return false;
      } else {
        return true;
      }
    } else { //user not logged in
      return false;
    }
  },
  remove: function(userId, doc) {
    return true;
  }
});
