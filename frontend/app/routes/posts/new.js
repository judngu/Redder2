import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.filter('post', {}, function(post) {
      return !post.get('isNew');
    });
  },

  setupController: function(controller, model) {
    this._super(controller, model);

    var newPost = this.store.createRecord('post');
    this.controller.set('newPost', newPost);
  },

  actions: {
   createPost: function(post) {
     post.save();

     var newPost = this.store.createRecord('post');
     this.controller.set('newPost', newPost);
   }
 }
});
