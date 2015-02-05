import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('post', params.post_id );
  },

  setupController: function (controller, model) {
    this._super(controller, model);
    // this.controllerFor('comment').set('newComment')
    var newComment = this.store.createRecord('comment', {
      // post: model
    });
    // controller.set('newComment', );
    controller.set('newComment', newComment );
  }
});
