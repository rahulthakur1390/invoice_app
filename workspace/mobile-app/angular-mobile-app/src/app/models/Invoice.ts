import { PRODUCT_TYPE } from '../enum/index'

export interface Invoice {
  id: number | undefined;
  mainContact: string;
  price: number;
  eName: string;
  aName: string;
  taxPercentage: number;
  discountPercentage: number;
  totalAmount: number;
  quantity: number;
  productType: PRODUCT_TYPE;
}
