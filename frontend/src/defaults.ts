import { IOrder, IOrderDetails } from "./interfaces";

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