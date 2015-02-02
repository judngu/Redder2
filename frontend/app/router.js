import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("about");
  this.resource("posts", function() {
    this.route('show', {path: ':post_id'});
    this.route('new');
    this.route('edit', {
      path: ':post_id/edit'});
  });
});

export default Router;
