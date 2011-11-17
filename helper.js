/*
 * Just a bunch of common helper things to save a bit of time.
 */

Pusher.log = function(msg) {
  if(console && console.log) {
    console.log(msg);
  }
};