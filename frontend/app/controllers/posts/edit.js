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
});
