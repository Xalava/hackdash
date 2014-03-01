/**
 * VIEW: Dashboard
 * 
 */
 
var template = require('./templates/dashboard.hbs');

module.exports = Backbone.Marionette.ItemView.extend({

  //--------------------------------------
  //+ PUBLIC PROPERTIES / CONSTANTS
  //--------------------------------------

  id: function(){
    return this.model.get("_id");
  },
  className: "dashboard span4",
  template: template,

  events: {
    "click .demo a": "stopPropagation",
    "click .add a": "onAddToCollection"
  },

  //--------------------------------------
  //+ INHERITED / OVERRIDES
  //--------------------------------------

  onRender: function(){
    this.$el
      .attr({
          "title": this.model.get("status")
        , "data-name": this.model.get("domain")
        , "data-date": this.model.get("created_at")
      })
      .tooltip({});

    $('.tooltips', this.$el).tooltip({});

    var url = "http://" + this.model.get("domain") + "." + hackdash.baseURL;

    this.$el.on("click", function(){
      window.location = url;
    });
  },

  //--------------------------------------
  //+ PUBLIC METHODS / GETTERS / SETTERS
  //--------------------------------------

  //--------------------------------------
  //+ EVENT HANDLERS
  //--------------------------------------

  stopPropagation: function(e){
    e.stopPropagation();
  },

  onAddToCollection: function(e){
    if (this.isContributor()){
      this.model.leave();
    }
    else {
      this.model.join();
    }

    e.stopPropagation();
  },

  //--------------------------------------
  //+ PRIVATE AND PROTECTED METHODS
  //--------------------------------------

});