import { Meteor } from 'meteor/meteor';

Images = new Mongo.Collection('images');

Meteor.startup(() => {
  console.log(Images.find().count());
  if (Images.find().count() === 0) {
    for (var i = 1; i < 23; i++) {
      Images.insert(
        {
           img_src: 'img_' + i + '.jpg',
           img_alt: 'img' + i
        }
      );
    }
  }
});
