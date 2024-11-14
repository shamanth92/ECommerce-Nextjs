import { Products } from "@/components/allProducts";
import { create } from "zustand";

export interface ItemsInCart {
  product: Products;
  quantity: number;
}

export enum ORDERSTATUS {
  Delivered = "DELIVERED",
  Ordered = "ORDERED",
  Shipped = "SHIPPED",
  OutForDelivery = "OUT FOR DELIVERY",
}

export interface ShippingInfo {
  address: string;
  city: string;
  deliveryType: string;
  email: string;
  name: string;
  phoneNumber: string;
  state: string;
  zipCode: string;
}

export interface CurrentOrder {
  orderNumber: string;
  dateOrdered: string;
  products: Array<ItemsInCart>;
  orderStatus: ORDERSTATUS;
  shippingInfo: ShippingInfo;
  email?: string;
}

export interface UserInfo {
  emailAddress: string | null;
  fullName: string | null;
  accountCreated: string;
  lastLoggedIn: string;
}

type State = {
  productSelect: any;
  checkoutItems: number;
  itemsInCart: Array<ItemsInCart>;
  favorites: any;
  editMode: boolean;
  currentOrder: Array<CurrentOrder>;
  userInfo: any
};

type Action = {
  updateProductSelect: (productSelect: State["productSelect"]) => void;
  updateCheckoutItems: (checkoutItems: State["checkoutItems"]) => void;
  updateItemsInCart: (itemsInCart: State["itemsInCart"]) => void;
  updateFavorites: (favorites: State["favorites"]) => void;
  setEditMode: (editMode: State["editMode"]) => void;
  setCurrentOrder: (currentOrder: State["currentOrder"]) => void;
  setUserInfo: (userInfo: State["userInfo"]) => void;
  resetState: () => void;
};

const initialState: State = {
  productSelect: {},
  checkoutItems: 0,
  itemsInCart: [],
  favorites: [],
  editMode: false,
  currentOrder: [],
  userInfo: {emailAddress: '',
    fullName: '',
    accountCreated: '',
    lastLoggedIn: ''},
}

// Create your store, which includes both state and (optionally) actions
export const useAppStore = create<State & Action>((set) => ({
  ...initialState,
  updateProductSelect: (productSelect) =>
    set(() => ({ productSelect: productSelect })),
  updateCheckoutItems: (checkoutItems) =>
    set(() => ({ checkoutItems: checkoutItems })),
  updateItemsInCart: (itemsInCart) => set(() => ({ itemsInCart: itemsInCart })),
  updateFavorites: (favorites) => set(() => ({ favorites: favorites })),
  setEditMode: (editMode) => set(() => ({ editMode: editMode })),
  setCurrentOrder: (currentOrder: Array<CurrentOrder>) =>
    set(() => ({ currentOrder: currentOrder })),
  setUserInfo: (userInfo) => set(() => ({ userInfo: userInfo })),
  resetState: () => { set(initialState) }
}));
