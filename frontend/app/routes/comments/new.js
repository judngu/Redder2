import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
  return this.store.createRecord('comment', {
    post: this.modelFor('posts/show')
    });
  },
  actions: {
    save: function() {
      var _this = this;
      var model = this.modelFor('comments/new');

    model.save().then(function(){
      _this.transitionTo('post.show');
      });
    },
    cancel: function() {
      this.transitionTo('post.show');
    }
  }
});
