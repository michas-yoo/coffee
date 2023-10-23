import { get, post, remove } from "./apiCalls.ts";
import {
  ICartItemPayload,
  ICartResponse,
  ICreationResponse,
  IEmptyResponse,
  IGalleryResponse,
  ILoginPayload,
  ILoginResponse,
  IOrderPayload,
  IOrderResponse,
  IOrdersResponse,
  IProductResponse,
  IRegisterPayload,
  IShopResponse,
  IShopsResponse,
} from "./types";

export class ApiClient {
  /**
   * @function
   * @description Возвращает актуальную корзину пользователя
   */
  static getCart = async (): Promise<ICartResponse> => get(`/cart`);

  /**
   * @function
   * @description Возвращает кафе по id
   * @param id - Id кафе
   */
  static getShop = async (id: number): Promise<IShopResponse> => get(`/shops/${id}`);

  /**
   * @function
   * @description Возвращает все доступные кафе
   */
  static getShops = async (): Promise<IShopsResponse> => get("/shops");

  /**
   * @function
   * @description Возвращает все заказы пользователя
   */
  static getOrders = async (): Promise<IOrdersResponse> => get("/orders");

  /**
   * @function
   * @description Возвращает галерею фотографий кафе
   * @param id - Id кафе
   */
  static getGallery = async (id: number): Promise<IGalleryResponse> => get(`/gallery/${id}`);

  /**
   * @function
   * @description Возвращает полную информацию о заказе
   * @param id - Id заказа
   */
  static getOrderById = async (id: number): Promise<IOrderResponse> => get(`/orders/${id}`);

  /**
   * @function
   * @description Возвращает подробную информацию о товаре
   * @param id
   * @param shopId
   */
  static getProductInfo = async ({ id, shopId }): Promise<IProductResponse> => get(`/menu/${shopId}/${id}`);

  /**
   * @function
   * @description Пытается войти в аккаунт пользователя
   * @param payload - Данные для входа
   */
  static login = async (payload: ILoginPayload): Promise<ILoginResponse> => post("/login", payload);

  /**
   * @function
   * @description Пытается зарегистрировать пользователя
   * @param payload - Данные для создания нового пользователя
   */
  static register = async (payload: IRegisterPayload): Promise<ICreationResponse> => post("/register", payload);

  /**
   * @function
   * @description Добавляет товар в корзину
   * @param payload
   */
  static addToCart = async (payload: ICartItemPayload): Promise<ICreationResponse> => post(`/cart`, payload);

  /**
   * @function
   * @description Создает заказ
   * @param payload - Данные о заказе
   */
  static createOrder = async (payload: IOrderPayload): Promise<ICreationResponse> => post("/orders", payload);

  /**
   * @function
   * @description Обновляет refresh-куку пользователя, accessToken остается прежним
   */
  static refreshToken = async (): Promise<ILoginResponse> => post("/refresh_token", {});

  /**
   * @function
   * @description Очищает корзину пользователя
   */
  static clearCart = async (): Promise<IEmptyResponse> => remove(`/cart`);

  /**
   * @function
   * @description Удаляет один товар из корзины пользователя
   * @param id - Id товара
   */
  static removeFromCart = async (id: number): Promise<IEmptyResponse> => remove(`/cart/${id}`);
}
