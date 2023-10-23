import { Money } from "../interfaces";

export interface IRequest {
  method?: string;
  body?: string;
  headers?: Record<string, string>;
  credentials?: string;
}

export interface IResponse {
  ok: boolean;
  data: any;
  message: string | string[] | null;
}

export interface ICreationResponse {
  id: number;
}

export interface IProductParams {
  id: number;
  shopId: number;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRegisterPayload {
  email: string;
  password: string;
  name: string;
  phone: string;
}

export interface ICartItemPayload {
  comment: string;
  price: Money;
  shop_id: number;
  amount: number;
  productId: number;
  modifierIds: string;
}

type CartItem = {
  amount: number,
  comment: string,
  shop_id: number,
  user_id: number,
  product_id: number,
  modifier_ids: string,
};

export interface IOrderPayload {
  cart: CartItem[],
  total: Money,
}
