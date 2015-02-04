define('redder/adapters/application', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].ActiveModelAdapter.extend({
    namespace: "api"
  });

});
define('redder/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', './config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  var App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  // export default App;
  exports['default'] = App;
  Ember['default'].View.extend({ //or Ember.Component.extend
    didInsertElement: function () {
      this.$().foundation(); //or Ember.$(document).foundation();
    }
  });

});
define('redder/controllers/posts/edit', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    isValid: Ember['default'].computed("model.title", "model.description", "model.url", function () {
      return !Ember['default'].isEmpty(this.get("model.title")) && !Ember['default'].isEmpty(this.get("model.description")) && !Ember['default'].isEmpty(this.get("model.url"));
    }),
    actions: {
      save: function () {
        if (this.get("isValid")) {
          var _this = this;
          this.get("model").save().then(function (post) {
            _this.transitionToRoute("posts.show", post);
          });
        } else {
          this.set("errorMessage", "You have to fill all the fields");
        }
        return false;
      },
      cancel: function () {
        this.transitionToRoute("posts.show", this.get("model"));
        return false;
      }
    }
  });

});
define('redder/controllers/posts/new', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    isValid: Ember['default'].computed("model.title", "model.description", "model.url", function () {
      return !Ember['default'].isEmpty(this.get("model.title")) && !Ember['default'].isEmpty(this.get("model.description")) && !Ember['default'].isEmpty(this.get("model.url"));
    }),

    actions: {
      save: function () {
        if (this.get("isValid")) {
          var _this = this;
          this.get("model").save().then(function (post) {
            _this.transitionToRoute("posts.show", post);
          });
        } else {
          this.set("errorMessage", "You have to fill all the fields");
        }

        return false;
      },
      cancel: function () {
        this.transitionToRoute("posts");

        return false;
      }
    }
  });

});
define('redder/initializers/app-version', ['exports', '../config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;

  exports['default'] = {
    name: "App Version",
    initialize: function (container, application) {
      var appName = classify(application.toString());
      Ember['default'].libraries.register(appName, config['default'].APP.version);
    }
  };

});
define('redder/initializers/export-application-global', ['exports', 'ember', '../config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    var classifiedName = Ember['default'].String.classify(config['default'].modulePrefix);

    if (config['default'].exportApplicationGlobal) {
      window[classifiedName] = application;
    }
  };

  exports['default'] = {
    name: "export-application-global",

    initialize: initialize
  };

});
define('redder/models/comment', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    body: DS['default'].attr("string"),
    post: DS['default'].belongsTo("post")
  });

});
define('redder/models/post', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    title: DS['default'].attr("string"),
    description: DS['default'].attr("string"),
    url: DS['default'].attr("string"),
    comments: DS['default'].hasMany("comment")
  });

});
define('redder/router', ['exports', 'ember', './config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route("about");
    this.resource("posts", function () {
      this.route("new");
      this.route("show", { path: ":post_id" });
      this.resource("comments", function () {
        this.route("new");
      });
      this.route("edit", {
        path: ":post_id/edit" });
    });
  });

  exports['default'] = Router;

});
define('redder/routes/about', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('redder/routes/application', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    actions: {
      save: function () {
        console.log("+---- save action bubbled up to application route");
        return true;
      },
      cancel: function () {
        console.log("+---- cancel action bubbled up to application route");
        return true;
      }
    }
  });

});
define('redder/routes/comments', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('redder/routes/comments/index', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function () {
      return this.modelFor("posts/show").get("comments");
    }
  });

});
define('redder/routes/comments/new', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function () {
      return this.store.createRecord("comment", {
        post: this.modelFor("posts/show")
      });
    },
    actions: {
      save: function () {
        var _this = this;
        var model = this.modelFor("comments/new");

        model.save().then(function () {
          _this.transitionTo("post.show");
        });
      },
      cancel: function () {
        this.transitionTo("post.show");
      }
    }
  });

});
define('redder/routes/index', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    beforeModel: function () {
      this.replaceWith("posts.index");
    }
  });

});
define('redder/routes/posts', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    actions: {
      save: function () {
        console.log("+--- save action bubbled up to posts route");
        return true;
      },
      cancel: function () {
        console.log("+--- cancel action bubbled up to posts route");
        return true;
      }
    }
  });

});
define('redder/routes/posts/edit', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('redder/routes/posts/index', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function () {
      return this.store.find("post");
    }
  });

});
define('redder/routes/posts/new', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function () {
      return this.store.createRecord("post");
    }
  });

});
define('redder/routes/posts/show', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('redder/templates/about', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    


    data.buffer.push("<div class=\"row\">\n  <h3>About</h3>\n    <div class=\"panel\">\n      <h5>Redder</h5>\n      <p>\n        The name “Redder” comes from the fusion of Reddit and Ember. Redder was created in response to a coding challenge issued by <a href=\"greenfieldhq.com\">Greenfield</a> which involved building a app with an Ember frontend with Ember CLI with a Rails backend for the api.  The long-term goal for redder is to look as similar to the real Reddit as possible and will be a continuing project.\n      </p>\n      <p>\n        Github: <a href=\"https://github.com/judngu/Redder2\">click here</a>\n      </p>\n    </div>\n    <div class=\"panel\">\n      <h5>The Creater</h5>\n      <p>\n        Redder was created by Judy Nguyen, a fresh <a href=\"launchacademy.co\">Launch Academy</a> graduate at the time of it's conception.  Redder is her first ember app.\n        Please visit me <a href=\n        \"http://linkedin.com/in/judngu\">LinkedIn</a>, <a href=\"http://twitter.com/judngu\">Twitter</a>, and <a href=\"http://judynguyen.me\">Portfolio</a> for more information.\n      </p>\n    </div>\n    <div class=\"panel\">\n      <h5>Disclaimer</h5>\n      <p>\n        All things Reddit belong to Reddit. Redder was just created for learning purposes. :)\n      </p>\n    </div>\n\n\n\n</div>\n");
    
  });

});
define('redder/templates/application', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


    data.buffer.push("<nav class=\"top-bar topbar\" data-topbar role=\"navigation\">\n  <ul class=\"title-area inline-list\">\n    <li class=\"name\">\n      <h1><img src=\"http://i.imgur.com/hc5nGVe.png\" height=\"25\" width=\"25\"></h1>\n    </li>\n    <li class=\"name\">\n      <h1>");
    data.buffer.push(escapeExpression((helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data},helper ? helper.call(depth0, "Redder", "application", options) : helperMissing.call(depth0, "link-to", "Redder", "application", options))));
    data.buffer.push("</h1>\n    </li>\n    <li class=\"toggle-topbar\"><a href=\"#\"><span>Menu</span></a></li>\n  </ul>\n\n  <section class=\"top-bar-section\">\n    <!-- Right Nav Section -->\n    <ul class=\"right\">\n      <li class=\"active\">");
    data.buffer.push(escapeExpression((helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data},helper ? helper.call(depth0, "Submit a link", "posts.new", options) : helperMissing.call(depth0, "link-to", "Submit a link", "posts.new", options))));
    data.buffer.push("</li>\n    </ul>\n\n    <!-- Left Nav Section -->\n    <ul class=\"left\">\n      <li>");
    data.buffer.push(escapeExpression((helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data},helper ? helper.call(depth0, "About", "about", options) : helperMissing.call(depth0, "link-to", "About", "about", options))));
    data.buffer.push("</li>\n    </ul>\n  </section>\n</nav>\n\n");
    stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    return buffer;
    
  });

});
define('redder/templates/comments', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1;


    stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    return buffer;
    
  });

});
define('redder/templates/comments/-form', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


    data.buffer.push("<form>\n  <h2>");
    stack1 = helpers._triageMustache.call(depth0, "errorMessage", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("</h2> <fieldset>\n  <fieldset>\n    comment:");
    data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
      'value': ("model.body")
    },hashTypes:{'value': "ID"},hashContexts:{'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
    data.buffer.push("</br>\n    <button ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
    data.buffer.push(" class=\"secondary tiny\">Save</button>\n    <button class=\"secondary tiny\"");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancel", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
    data.buffer.push(">Cancel</button>\n  </fieldset>\n</form>\n");
    return buffer;
    
  });

});
define('redder/templates/comments/index', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1, self=this;

  function program1(depth0,data) {
    
    var buffer = '', stack1;
    data.buffer.push("\n  <tr>\n    <td>");
    stack1 = helpers._triageMustache.call(depth0, "comment.body", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("</td> <td></td>\n    <td></td>\n  </tr>\n");
    return buffer;
    }

    data.buffer.push(" ");
    stack1 = helpers.each.call(depth0, "comments", "in", "model", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    return buffer;
    
  });

});
define('redder/templates/comments/new', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


    data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "comments/form", options) : helperMissing.call(depth0, "partial", "comments/form", options))));
    data.buffer.push("\n");
    return buffer;
    
  });

});
define('redder/templates/index', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1;


    stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    return buffer;
    
  });

});
define('redder/templates/posts', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1;


    data.buffer.push("\n");
    stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    return buffer;
    
  });

});
define('redder/templates/posts/-form', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


    data.buffer.push("<div class=\"row\">\n  <ul class=\"no-bullet\">\n    <form ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{
      'on': ("submit")
    },hashTypes:{'on': "STRING"},hashContexts:{'on': depth0},contexts:[depth0],types:["STRING"],data:data})));
    data.buffer.push(">\n      <h2>");
    stack1 = helpers._triageMustache.call(depth0, "errorMessage", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("</h2>\n      <li>Title: ");
    data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
      'value': ("model.title")
    },hashTypes:{'value': "ID"},hashContexts:{'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
    data.buffer.push("</li>\n      <li>Description: ");
    data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
      'value': ("model.description")
    },hashTypes:{'value': "ID"},hashContexts:{'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
    data.buffer.push("</li>\n      <li>URL: ");
    data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
      'value': ("model.url")
    },hashTypes:{'value': "ID"},hashContexts:{'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
    data.buffer.push("</li>\n      <li><input type=\"submit\" value=\"Save\" class=\"button tiny secondary\"/>\n  <button class=\"tiny secondary\"");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancel", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
    data.buffer.push(">Cancel</button></li>\n    </form>\n  </ul>\n</div>\n");
    return buffer;
    
  });

});
define('redder/templates/posts/edit', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


    data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "posts/form", options) : helperMissing.call(depth0, "partial", "posts/form", options))));
    data.buffer.push("\n");
    return buffer;
    
  });

});
define('redder/templates/posts/index', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1, self=this, helperMissing=helpers.helperMissing;

  function program1(depth0,data) {
    
    var buffer = '', stack1, helper, options;
    data.buffer.push("\n    <li class=\"panel\">");
    stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "posts.show", "", options) : helperMissing.call(depth0, "link-to", "posts.show", "", options));
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("<br>");
    stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "posts.show", "", options) : helperMissing.call(depth0, "link-to", "posts.show", "", options));
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("<br>\n    comments (");
    stack1 = helpers._triageMustache.call(depth0, "comments.length", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push(")</li>\n  ");
    return buffer;
    }
  function program2(depth0,data) {
    
    var buffer = '', stack1;
    data.buffer.push("\n      <b>");
    stack1 = helpers._triageMustache.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("<b>");
    return buffer;
    }

  function program4(depth0,data) {
    
    var buffer = '', stack1;
    data.buffer.push("\n      ");
    stack1 = helpers._triageMustache.call(depth0, "description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    return buffer;
    }

    data.buffer.push("<div class=\"row\">\n  <ul class=\"no-bullet\">\n  ");
    stack1 = helpers.each.call(depth0, {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n  </ul>\n</div>\n\n");
    return buffer;
    
  });

});
define('redder/templates/posts/new', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


    data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "posts/form", options) : helperMissing.call(depth0, "partial", "posts/form", options))));
    data.buffer.push("\n");
    return buffer;
    
  });

});
define('redder/templates/posts/show', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = '', stack1;
    data.buffer.push("\n    <li>");
    stack1 = helpers._triageMustache.call(depth0, "body", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("</li>\n  ");
    return buffer;
    }

    data.buffer.push("<div class=\"panel\">\n  <h4>");
    stack1 = helpers._triageMustache.call(depth0, "model.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("(");
    stack1 = helpers._triageMustache.call(depth0, "model.url", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push(")</h4>\n  <p>");
    stack1 = helpers._triageMustache.call(depth0, "model.description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("</p>\n  <p>");
    data.buffer.push(escapeExpression((helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["STRING","STRING","ID"],data:data},helper ? helper.call(depth0, "edit", "posts.edit", "model", options) : helperMissing.call(depth0, "link-to", "edit", "posts.edit", "model", options))));
    data.buffer.push("\n</div>\n\n<h5>Comments:</h5>\n<ul>\n  ");
    stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n  ");
    stack1 = helpers.each.call(depth0, "comments", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n</ul>\n");
    return buffer;
    
  });

});
define('redder/tests/adapters/application.jshint', function () {

  'use strict';

  module('JSHint - adapters');
  test('adapters/application.js should pass jshint', function() { 
    ok(true, 'adapters/application.js should pass jshint.'); 
  });

});
define('redder/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
  });

});
define('redder/tests/controllers/posts/edit.jshint', function () {

  'use strict';

  module('JSHint - controllers/posts');
  test('controllers/posts/edit.js should pass jshint', function() { 
    ok(true, 'controllers/posts/edit.js should pass jshint.'); 
  });

});
define('redder/tests/controllers/posts/new.jshint', function () {

  'use strict';

  module('JSHint - controllers/posts');
  test('controllers/posts/new.js should pass jshint', function() { 
    ok(true, 'controllers/posts/new.js should pass jshint.'); 
  });

});
define('redder/tests/helpers/resolver', ['exports', 'ember/resolver', '../../config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('redder/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('redder/tests/helpers/start-app', ['exports', 'ember', '../../app', '../../router', '../../config/environment'], function (exports, Ember, Application, Router, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('redder/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('redder/tests/models/comment.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/comment.js should pass jshint', function() { 
    ok(true, 'models/comment.js should pass jshint.'); 
  });

});
define('redder/tests/models/post.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/post.js should pass jshint', function() { 
    ok(true, 'models/post.js should pass jshint.'); 
  });

});
define('redder/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(true, 'router.js should pass jshint.'); 
  });

});
define('redder/tests/routes/about.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/about.js should pass jshint', function() { 
    ok(true, 'routes/about.js should pass jshint.'); 
  });

});
define('redder/tests/routes/application.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/application.js should pass jshint', function() { 
    ok(true, 'routes/application.js should pass jshint.'); 
  });

});
define('redder/tests/routes/comments.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/comments.js should pass jshint', function() { 
    ok(true, 'routes/comments.js should pass jshint.'); 
  });

});
define('redder/tests/routes/comments/index.jshint', function () {

  'use strict';

  module('JSHint - routes/comments');
  test('routes/comments/index.js should pass jshint', function() { 
    ok(true, 'routes/comments/index.js should pass jshint.'); 
  });

});
define('redder/tests/routes/comments/new.jshint', function () {

  'use strict';

  module('JSHint - routes/comments');
  test('routes/comments/new.js should pass jshint', function() { 
    ok(true, 'routes/comments/new.js should pass jshint.'); 
  });

});
define('redder/tests/routes/index.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/index.js should pass jshint', function() { 
    ok(true, 'routes/index.js should pass jshint.'); 
  });

});
define('redder/tests/routes/posts.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/posts.js should pass jshint', function() { 
    ok(true, 'routes/posts.js should pass jshint.'); 
  });

});
define('redder/tests/routes/posts/edit.jshint', function () {

  'use strict';

  module('JSHint - routes/posts');
  test('routes/posts/edit.js should pass jshint', function() { 
    ok(true, 'routes/posts/edit.js should pass jshint.'); 
  });

});
define('redder/tests/routes/posts/index.jshint', function () {

  'use strict';

  module('JSHint - routes/posts');
  test('routes/posts/index.js should pass jshint', function() { 
    ok(true, 'routes/posts/index.js should pass jshint.'); 
  });

});
define('redder/tests/routes/posts/new.jshint', function () {

  'use strict';

  module('JSHint - routes/posts');
  test('routes/posts/new.js should pass jshint', function() { 
    ok(true, 'routes/posts/new.js should pass jshint.'); 
  });

});
define('redder/tests/routes/posts/show.jshint', function () {

  'use strict';

  module('JSHint - routes/posts');
  test('routes/posts/show.js should pass jshint', function() { 
    ok(true, 'routes/posts/show.js should pass jshint.'); 
  });

});
define('redder/tests/test-helper', ['./helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('redder/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('redder/tests/unit/adapters/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("adapter:application", "ApplicationAdapter", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function () {
    var adapter = this.subject();
    ok(adapter);
  });
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']

});
define('redder/tests/unit/adapters/application-test.jshint', function () {

  'use strict';

  module('JSHint - unit/adapters');
  test('unit/adapters/application-test.js should pass jshint', function() { 
    ok(true, 'unit/adapters/application-test.js should pass jshint.'); 
  });

});
define('redder/tests/unit/controllers/posts/edit-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("controller:posts/edit", "PostsEditController", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function () {
    var controller = this.subject();
    ok(controller);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('redder/tests/unit/controllers/posts/edit-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers/posts');
  test('unit/controllers/posts/edit-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/posts/edit-test.js should pass jshint.'); 
  });

});
define('redder/tests/unit/controllers/posts/new-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("controller:posts/new", "PostsNewController", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function () {
    var controller = this.subject();
    ok(controller);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('redder/tests/unit/controllers/posts/new-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers/posts');
  test('unit/controllers/posts/new-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/posts/new-test.js should pass jshint.'); 
  });

});
define('redder/tests/unit/models/comment-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel("comment", "Comment", {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test("it exists", function () {
    var model = this.subject();
    // var store = this.store();
    ok(!!model);
  });

});
define('redder/tests/unit/models/comment-test.jshint', function () {

  'use strict';

  module('JSHint - unit/models');
  test('unit/models/comment-test.js should pass jshint', function() { 
    ok(true, 'unit/models/comment-test.js should pass jshint.'); 
  });

});
define('redder/tests/unit/models/comments-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel("comments", "Comments", {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test("it exists", function () {
    var model = this.subject();
    // var store = this.store();
    ok(!!model);
  });

});
define('redder/tests/unit/models/comments-test.jshint', function () {

  'use strict';

  module('JSHint - unit/models');
  test('unit/models/comments-test.js should pass jshint', function() { 
    ok(true, 'unit/models/comments-test.js should pass jshint.'); 
  });

});
define('redder/tests/unit/models/post-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel("post", "Post", {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test("it exists", function () {
    var model = this.subject();
    // var store = this.store();
    ok(!!model);
  });

});
define('redder/tests/unit/models/post-test.jshint', function () {

  'use strict';

  module('JSHint - unit/models');
  test('unit/models/post-test.js should pass jshint', function() { 
    ok(true, 'unit/models/post-test.js should pass jshint.'); 
  });

});
define('redder/tests/unit/routes/about-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:about", "AboutRoute", {});

  ember_qunit.test("it exists", function () {
    var route = this.subject();
    ok(route);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('redder/tests/unit/routes/about-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/about-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/about-test.js should pass jshint.'); 
  });

});
define('redder/tests/unit/routes/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:application", "ApplicationRoute", {});

  ember_qunit.test("it exists", function () {
    var route = this.subject();
    ok(route);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('redder/tests/unit/routes/application-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/application-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/application-test.js should pass jshint.'); 
  });

});
define('redder/tests/unit/routes/comments-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:comments", "CommentsRoute", {});

  ember_qunit.test("it exists", function () {
    var route = this.subject();
    ok(route);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('redder/tests/unit/routes/comments-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/comments-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/comments-test.js should pass jshint.'); 
  });

});
define('redder/tests/unit/routes/comments/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:comments/index", "CommentsIndexRoute", {});

  ember_qunit.test("it exists", function () {
    var route = this.subject();
    ok(route);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('redder/tests/unit/routes/comments/index-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/comments');
  test('unit/routes/comments/index-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/comments/index-test.js should pass jshint.'); 
  });

});
define('redder/tests/unit/routes/friends/show-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:friends/show", "FriendsShowRoute", {});

  ember_qunit.test("it exists", function () {
    var route = this.subject();
    ok(route);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('redder/tests/unit/routes/friends/show-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/friends');
  test('unit/routes/friends/show-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/friends/show-test.js should pass jshint.'); 
  });

});
define('redder/tests/unit/routes/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:index", "IndexRoute", {});

  ember_qunit.test("it exists", function () {
    var route = this.subject();
    ok(route);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('redder/tests/unit/routes/index-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/index-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/index-test.js should pass jshint.'); 
  });

});
define('redder/tests/unit/routes/post-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:post", "PostRoute", {});

  ember_qunit.test("it exists", function () {
    var route = this.subject();
    ok(route);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('redder/tests/unit/routes/post-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/post-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/post-test.js should pass jshint.'); 
  });

});
define('redder/tests/unit/routes/post/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:post/index", "PostIndexRoute", {});

  ember_qunit.test("it exists", function () {
    var route = this.subject();
    ok(route);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('redder/tests/unit/routes/post/index-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/post');
  test('unit/routes/post/index-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/post/index-test.js should pass jshint.'); 
  });

});
define('redder/tests/unit/routes/post/show-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:post/show", "PostShowRoute", {});

  ember_qunit.test("it exists", function () {
    var route = this.subject();
    ok(route);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('redder/tests/unit/routes/post/show-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/post');
  test('unit/routes/post/show-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/post/show-test.js should pass jshint.'); 
  });

});
define('redder/tests/unit/routes/posts/edit-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:posts/edit", "PostsEditRoute", {});

  ember_qunit.test("it exists", function () {
    var route = this.subject();
    ok(route);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('redder/tests/unit/routes/posts/edit-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/posts');
  test('unit/routes/posts/edit-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/posts/edit-test.js should pass jshint.'); 
  });

});
/* jshint ignore:start */

define('redder/config/environment', ['ember'], function(Ember) {
  var prefix = 'redder';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("redder/tests/test-helper");
} else {
  require("redder/app")["default"].create({"name":"redder","version":"0.0.0.65136bd9"});
}

/* jshint ignore:end */
//# sourceMappingURL=redder.map