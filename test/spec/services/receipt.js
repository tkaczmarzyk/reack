'use strict';

describe('Service: ReceiptGenerator', function () {

  var ReceiptGenerator,
    mockFinancialService = { addData: function(arg,config) {return arg;} },
    mockTimesheet = {
      fetchProjectData: function(requestData, callback, onError) {
        console.log('mock fetchProjectData');
        callback([{sum: 100}, {sum: 200}]);
        console.log('after calllback !!!!!!!!!!!!');
      }
    },
    mockConfig = {
      managerName: 'The Manager',
      workerName: 'The Worker',
      dailyWage: 100
    },
    mockPersistence = {
      loadConfig: function() {
        return mockConfig;
      }
    };

  // load the controller's module
  beforeEach(module('reackServices', function($provide) {
    spyOn(mockFinancialService, 'addData').andCallThrough();
    $provide.value('FinancialService', mockFinancialService);
    $provide.value('Timesheet', mockTimesheet);
    $provide.value('Persistence',mockPersistence);
  }));
  beforeEach(inject(function(_ReceiptGenerator_) {
    ReceiptGenerator = _ReceiptGenerator_;
  }));

  it('should add decorate all entries from timesheet with financial data', inject(function () {
    console.log("test started ...")
    var receipt = ReceiptGenerator.generateReceipt();
    console.log("created receipt Generator");
    expect(mockFinancialService.addData).toHaveBeenCalledWith({sum: 100},mockConfig);
    expect(mockFinancialService.addData).toHaveBeenCalledWith({sum: 200},mockConfig);
  }));

  it('should add multisport plus entry if specified in config', inject(function () {
    mockConfig.multisport = 'plus';
    var receipt = ReceiptGenerator.generateReceipt();
    expect(receipt.projects.length).toBe(3);
  }));

  it('should add multisport classic entry if specified in config', inject(function () {
    mockConfig.multisport = 'classic';
    var receipt = ReceiptGenerator.generateReceipt();
    expect(receipt.projects.length).toBe(3);
  }));

  it('should include all entries from timesheet', inject(function (Persistence) {
    mockConfig.multisport = null;
    var receipt = ReceiptGenerator.generateReceipt();

    expect(receipt.projects.length).toBe(2);
  }));

  it('should calculate total sum', inject(function (Persistence) {
    var receipt = ReceiptGenerator.generateReceipt();

    expect(receipt.totalSum).toBe(300);
  }));
});
