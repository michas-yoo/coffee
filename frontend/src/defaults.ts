import {
  IShop,
  IOrder,
  IProductShort,
  IOrderDetails,
} from "./interfaces";

export const DEFAULT_ORDER: IOrder = {
  id: 0,
  shop_id: 0,
  user_id: 0,
  status_id: 0,
  shop: { name: "", geo: "" },
  items: [],
  price: 0,
  created_at: "",
};

export const DEFAULT_FULL_ORDER_INFO: IOrderDetails = {
  id: 0,
  shop_id: 0,
  user_id: 0,
  price: 0,
  created_at: "",
  status_id: 0,
  name: "",
  geo: "",
  items: [],
};

export const DEFAULT_SHOP: IShop = {
  id: 1,
  name: "Кофейня 1",
  geo: "ул. Пушкина, д. 2",
  open_time: "09:00",
  close_time: "17:00",
  poster: "",
  menu: [],
  gallery: [],
};

export const DEFAULT_PRODUCT: IProductShort = {
  id: 1,
  name: "Эспрессо",
  photo: "",
  price: 20,
  modifier_types: "",
};
