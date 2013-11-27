'use strict';

describe('Service: Persistence', function () {

  var service;

  // load the controller's module
  beforeEach(module('reackServices'));

  it('should remember saved daily wage', inject(function (Persistence) {
    Persistence.saveDailyWage(1000);
    var loadedWage = Persistence.loadDailyWage();
    expect(loadedWage).toEqual(1000);
  }));

  it('should return null if no previously remembered daily wage', inject(function (Persistence) {
    var dailyWage = Persistence.loadDailyWage();
    expect(dailyWage).toEqual(null);
  }));
});
