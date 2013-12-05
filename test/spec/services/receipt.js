'use strict';

describe('Service: ReceiptGenerator', function () {

  var ReceiptGenerator,
    mockFinancialService = { addData: function(arg) {return arg;} },
    mockTimesheet = {
      fetchProjectData: function(token, callback, onError) {
        console.log('mock fetchProjectData');
        callback([{sum: 100}, {sum: 200}]);
      }
    },
    mockConfig = {
      managerName: 'The Manager',
      workerName: 'The Worker',
      dailyWage: 100
    },
    mockPersistence;

  // load the controller's module
  beforeEach(module('reackServices', function($provide) {
    spyOn(mockFinancialService, 'addData').andCallThrough();
    $provide.value('FinancialService', mockFinancialService);
    $provide.value('Timesheet', mockTimesheet);
  }));
  beforeEach(inject(function(_ReceiptGenerator_) {
    ReceiptGenerator = _ReceiptGenerator_;
  }));

  it('should add decorate all entries from timesheet with financial data', inject(function () {
    var receipt = ReceiptGenerator.generateReceipt();
    expect(mockFinancialService.addData).toHaveBeenCalledWith({sum: 100});
    expect(mockFinancialService.addData).toHaveBeenCalledWith({sum: 200});
  }));

  it('should include all entries from timesheet', inject(function (Persistence) {
    var receipt = ReceiptGenerator.generateReceipt();

    expect(receipt.projects.length).toBe(2);
  }));

  it('should calculate total sum', inject(function (Persistence) {
    var receipt = ReceiptGenerator.generateReceipt();

    expect(receipt.totalSum).toBe(300);
  }));
});
