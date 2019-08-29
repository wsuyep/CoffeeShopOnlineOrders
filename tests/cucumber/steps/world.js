var { setWorldConstructor } = require('cucumber');

class CustomWorld {
  constructor() {
    this.testResult = false;
    this.dbHelper;
    this.payload = {
      shopName: 'testShop',
      address: 'testAddress',
      phone: '123-456-7890',
      shopName: "testShop",
      orderDetail: "2 order of fried chicken",
      customerName: "name",
      customerPhone: "7781231234",
      pickupTime: "2019-08-27 21:54:00",
      orderId: '',
      apiToken: '',
    };
  }

  getResult() {
    return this.testResult;
  }
  setResult(value) {
    this.testResult = value
  }
}

setWorldConstructor(CustomWorld)