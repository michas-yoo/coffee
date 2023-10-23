export type URL = string;
type Money = number;
type DateTime = string;
type StringList = string;

export type OrderData = {
  data: IOrder
};

export type MainInfo = {
  email: string
  password: string
};

export type ProfileInfo = {
  name: string
  phone: string
};

export interface ILoginResponse {
  id?: number;
  username: string,
  accessToken: string,
}

export interface IModifier {
  id: number;
  name: string;
  price: Money;
  type: number;
}

export interface IProductModifier {
  id: number;
  name: string;
  multipleSelect: boolean;
  modifiers: IModifier[];
}

export interface IModifierType {
  id: number;
  name: string;
  multi_selectable: number;
}

interface IProductShort {
  id: number;
  name: string;
  photo: URL;
  price: Money;
  modifier_types: StringList;
}

interface IMenuItem {
  id: number;
  name: string;
  photo: URL;
  price: Money;
  product_id: number;
}

interface IGalleryPhoto {
  id: number;
  photo: URL;
  shop_id: number;
}

interface IShop {
  id: number;
  name: string;
  geo: string;
  open_time: string;
  close_time: string;
  poster: URL;
  menu: IMenuItem[];
  gallery: IGalleryPhoto[];
}

interface ICartItem {
  id: number;
  shop_id: number;
  user_id: number;
  product_id: number;
  amount: number;
  modifier_ids: StringList;
  price: Money;
  comment: string;
  modifiers: IModifier[];
  product: IProductShort;
  shop: IShop;
}

export interface IProductRaw {
  id: number;
  name: string;
  photo: URL;
  price: Money;
  product_id: number,
  modifier_types: IModifierType[];
  modifiers: IModifier[];
}

export interface IProductFull extends IProductRaw {
  modifiers: IProductModifier[];
}

interface IOrderItem {
  id: number;
  order_id: number;
  product_id: number;
  modifier_ids: StringList;
  amount: number;
  comment: string;
  photo: URL;
  name: string;
}

interface IShopShort {
  name: string;
  geo: string;
}

export interface IOrder {
  id: number;
  shop_id: number;
  user_id: number;
  status_id: number;
  shop: IShopShort;
  items: IOrderItem[];
  price: Money;
  created_at: DateTime;
}

interface IMappedProduct {
  id: number;
  amount: number;
  comment: string;
  modifiers: IModifier[];
  modifier_ids: StringList;
  product: IProductShort;
}

export interface IOrderDetails {
  id: number;
  shop_id: number;
  user_id: number;
  price: Money;
  created_at: DateTime;
  status_id: number;
  name: string;
  geo: string;
  items: IMappedProduct[];
}

export interface IAppStore {
  cart: ICartItem[];
  greeting: string;
  loading: boolean;
  username: string;
  accessToken: string;
  productId: number;
  currentPage: string;
}
