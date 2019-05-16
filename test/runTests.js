var Jasmine = require('jasmine');
var jasmine = new Jasmine();

jasmine.loadConfigFile('test/unit/support/jasmine.json');

jasmine.execute();
