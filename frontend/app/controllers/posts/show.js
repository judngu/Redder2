import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save: function() {
      var _this = this;
      this.get('newComment').set('post', this.get('model'));
      this.get('newComment').save().then(function(comment) {
        var newComment = _this.store.createRecord('comment')
        _this.set('newComment', newComment);
      });
    }
  }
});
