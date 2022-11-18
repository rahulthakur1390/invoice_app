import { Invoice } from "../models/Invoice";

let productsData: Invoice[] = [
  {
    id: 1,
    mainContact: "Invoice 1",
    price: 10.99,
    quantity:1,
    discountPercentage: 10,
    taxPercentage: 5,
    eName: 'test',
    aName: 'tset',
    totalAmount: 1000,
    productType: 0
  },
];

export default productsData;