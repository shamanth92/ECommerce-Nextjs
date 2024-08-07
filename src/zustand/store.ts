import { create } from 'zustand'

type State = {
    productSelect: any;
  }
  
  type Action = {
    updateProductSelect: (firstName: State['productSelect']) => void
  }
  
  // Create your store, which includes both state and (optionally) actions
  export const useAppStore = create<State & Action>((set) => ({
    productSelect: {},
    updateProductSelect: (productSelect) => set(() => ({ productSelect: productSelect })),
  }))