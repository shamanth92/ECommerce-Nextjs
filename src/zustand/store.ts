import { Products } from '@/components/allProducts';
import { create } from 'zustand'

export interface ItemsInCart {
    product:  Products
    quantity: number;
}

type State = {
    productSelect: any;
    checkoutItems: number;
    itemsInCart: Array<ItemsInCart>;
    favorites: any;
  }
  
  type Action = {
    updateProductSelect: (productSelect: State['productSelect']) => void
    updateCheckoutItems: (checkoutItems: State['checkoutItems']) => void
    updateItemsInCart: (itemsInCart: State['itemsInCart']) => void
    updateFavorites: (favorites: State['favorites']) => void
  }
  
  // Create your store, which includes both state and (optionally) actions
  export const useAppStore = create<State & Action>((set) => ({
    productSelect: {},
    checkoutItems: 0,
    itemsInCart: [],
    favorites: [],
    updateProductSelect: (productSelect) => set(() => ({ productSelect: productSelect })),
    updateCheckoutItems: (checkoutItems) => set(() => ({ checkoutItems: checkoutItems })),
    updateItemsInCart: (itemsInCart) => set(() => ({ itemsInCart: itemsInCart })),
    updateFavorites: (favorites) => set(() => ({ favorites: favorites })),
  }))
