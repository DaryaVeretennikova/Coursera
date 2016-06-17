import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

 var img_data = [{
    img_src: 'http://placekitten.com.s3.amazonaws.com/homepage-samples/200/287.jpg',
    img_alt: 'laptops'
 },
 {
    img_src: 'http://24.media.tumblr.com/tumblr_m2kmg2VK2a1qhwmnpo1_1280.jpg',
    img_alt: 'cats'
 },
 {
    img_src: 'http://placekitten.com.s3.amazonaws.com/homepage-samples/408/287.jpg',
    img_alt: 'laptops'
 }];

Template.images.helpers({images: img_data});

Template.images.events({
  'click .js-image': function(event) {
    $(event.target).css({
      width: '50px'
    });
  }
});
