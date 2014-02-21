/**
 * Collection: Projectss
 *
 */

var 
  Project = require('./Project');

module.exports = Backbone.Collection.extend({

  model: Project,

  idAttribute: "_id",
  
  url: function(){
    return hackdash.apiURL + '/projects'; 
  },

  parse: function(response){
    var projects = [];

    // only parse projects actives if no user or user not admin of dash
    _.each(response, function(project){

      if (hackdash.app.type === "dashboard"){
        var user = hackdash.user;
        var isAdmin = user && (user._id === project.leader || user.admin_in.indexOf(this.domain) >= 0);
        if (isAdmin || project.active){
          projects.push(project);
        }
      }
      else if (project.active) {
        projects.push(project);
      }

    });

    return projects;
  }

});
