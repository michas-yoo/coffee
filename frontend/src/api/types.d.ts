import {
  ICartItem,
  IGalleryPhoto,
  IOrder,
  IOrderDetails,
  IProductFull,
  IShop,
  LoginResponse,
  Money,
} from "../interfaces";

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

export interface ICartResponse extends IResponse {
  data: ICartItem[];
}

export interface IShopResponse extends IResponse {
  data: IShop;
}

export interface IShopsResponse extends IResponse {
  data: IShop[];
}

export interface IOrderResponse extends IResponse {
  data: IOrderDetails;
}

export interface IOrdersResponse extends IResponse {
  data: IOrder[];
}

export interface IGalleryResponse extends IResponse {
  data: IGalleryPhoto[];
}

export interface IProductResponse extends IResponse {
  data: IProductFull;
}

export interface ILoginResponse extends IResponse {
  data: LoginResponse;
}

export interface ICreationResponse extends IResponse {
  data: {
    id: number;
  };
}

export interface IEmptyResponse extends IResponse {
  data: null;
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
