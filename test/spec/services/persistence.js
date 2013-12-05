'use strict';

describe('Service: Persistence', function () {

  var service;

  // load the controller's module
  beforeEach(module('reackServices'));

  it('should return null if no previously remembered config', inject(function (Persistence) {
    var config = Persistence.loadConfig();
    expect(config.dailyWage).toEqual(null);
  }));

  it('should remember saved daily wage', inject(function (Persistence) {
    Persistence.saveConfig({dailyWage: 1000});
    var config = Persistence.loadConfig();
    expect(config.dailyWage).toEqual(1000);
  }));
});
