import { Meteor } from 'meteor/meteor';

Images = new Mongo.Collection('images');

Meteor.startup(() => {
  console.log(Images.find().count());
  if (Images.find().count() === 0) {
    Images.insert(
      {
         img_src: 'http://24.media.tumblr.com/tumblr_m2kmg2VK2a1qhwmnpo1_1280.jpg',
         img_alt: 'cats'
      }
    );
    Images.insert(
      {
        img_src: 'http://24.media.tumblr.com/tumblr_m2kmg2VK2a1qhwmnpo1_1280.jpg',
        img_alt: 'cats'
      }
    );
  }
});
