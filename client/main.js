import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

// Template.hello.onCreated(function helloOnCreated() {
//   // counter starts at 0
//   this.counter = new ReactiveVar(0);
// });

// Template.hello.helpers({
//   counter() {
//     return Template.instance().counter.get();
//   },
// });

// Template.hello.events({
//   'click button'(event, instance) {
//     // increment the counter when button is clicked
//     instance.counter.set(instance.counter.get() + 1);
//   },
// });
 var img_data = [{
    img_src: 'http://prigorod77.ru/img/medal.png',
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
