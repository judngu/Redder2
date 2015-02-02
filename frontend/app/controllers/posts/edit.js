import Ember from 'ember';

export default Ember.Controller.extend({
  isValid: Ember.computed(
    'model.title',
    'model.description',
    'model.url',
    function() {
      return !Ember.isEmpty(this.get('model.title')) &&
      !Ember.isEmpty(this.get('model.description')) &&
      !Ember.isEmpty(this.get('model.url'));
    }
  ),
  actions: {
    save: function() {
      if (this.get('isValid')) {
        var _this = this;
        this.get('model').save().then(function(post) {
          _this.transitionToRoute('posts.show', post);
        });
      } else {
        this.set('errorMessage', 'You have to fill all the fields');
      }
      return false;
    },
    cancel: function() {
      this.transitionToRoute('posts.show', this.get('model'));
      return false;
    }
  }
});
