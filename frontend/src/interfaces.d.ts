export type URL = string;
type Money = number;
type DateTime = string;
type StringList = string;

export interface IModifier {
  id: number,
  name: string,
  price: Money,
  type: number,
}

export interface IModifierType {
  id: number,
  name: string,
  multi_selectable: number,
}

interface IProductShort {
  id: number,
  name: string,
  photo: URL,
  price: Money,
  modifier_types: StringList
}

interface IMenuItem {
  id: number,
  name: string,
  photo: URL,
  price: Money,
  product_id: number,
}

interface IGalleryPhoto {
  id: number,
  photo: URL,
  shop_id: number,
}

interface IShop {
  id: number,
  name: string,
  geo: string,
  open_time: string,
  close_time: string,
  poster: URL,
  menu: IMenuItem[],
  gallery: IGalleryPhoto[],
}

interface ICartItem {
  id: number,
  shop_id: number,
  user_id: number,
  product_id: number,
  amount: number,
  modifier_ids: StringList,
  price: Money,
  comment: string,
  modifiers: IModifier[],
  product: IProductShort,
  shop: IShop,
}

interface IProductFull {
  id: number,
  name: string,
  photo: URL,
  price: Money,
  modifier_types: IModifierType[],
  modifiers: IModifier[]
}

interface IOrderItem {
  id: number,
  order_id: number,
  product_id: number,
  modifier_ids: StringList,
  amount: number,
  comment: string,
  photo: URL,
  name: string,
}

interface IOrder {
  id: number,
  shop_id: number,
  user_id: number,
  price: Money,
  created_at: DateTime,
  status_id: number,
  items: IOrderItem[],
  shop: IShop,
}

interface IMappedProduct {
  id: number,
  amount: number,
  comment: string,
  modifiers: IModifier[],
  modifier_ids: StringList,
  product: IProductShort,
}

interface IOrderDetails {
  id: number,
  shop_id: number,
  user_id: number,
  price: Money,
  created_at: DateTime,
  status_id: number,
  name: string,
  geo: string,
  items: IMappedProduct[]
}

export interface IAppStore {
  cart: ICartItem[],
  greeting: string,
  loading: boolean,
  username: string,
  accessToken: string,
  productId: number,
  currentPage: string,
}

export interface IProductModifier {
  id: number,
  name: string,
  multipleSelect: boolean,
  modifiers: IModifier[],
}
