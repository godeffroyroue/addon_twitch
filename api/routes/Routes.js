module.exports = function(app) {
    var APIroute = require('../controllers/Controllers');
    // API Routes
    app.route('/twitch/testmescouilles')
    .all(APIroute.testmescouilles)
  };
