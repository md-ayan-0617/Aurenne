import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BagItem, Product } from '../types';

interface BagStore {
  items: BagItem[];
  isBagOpen: boolean;
  openBag: () => void;
  closeBag: () => void;
  toggleBag: () => void;
  addToBag: (product: Product, size?: string, material?: string) => void;
  removeFromBag: (productId: string, size: string, material: string) => void;
  updateQuantity: (productId: string, size: string, material: string, quantity: number) => void;
  clearBag: () => void;
  getTotalCount: () => number;
  getSubtotal: () => number;
}

export const useBagStore = create<BagStore>()(
  persist(
    (set, get) => ({
      items: [],
      isBagOpen: false,
      openBag: () => set({ isBagOpen: true }),
      closeBag: () => set({ isBagOpen: false }),
      toggleBag: () => set((state) => ({ isBagOpen: !state.isBagOpen })),
      addToBag: (product, size, material) => {
        const selectedSize = size || (product.sizes?.[0] || 'Standard');
        const selectedMaterial = material || (product.materials?.[0] || '18K Yellow Gold');
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) =>
              item.product.id === product.id &&
              item.selectedSize === selectedSize &&
              item.selectedMaterial === selectedMaterial
          );

          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex].quantity += 1;
            return { items: updatedItems, isBagOpen: true };
          }

          return {
            items: [
              ...state.items,
              {
                product,
                quantity: 1,
                selectedSize,
                selectedMaterial,
              },
            ],
            isBagOpen: true,
          };
        });
      },
      removeFromBag: (productId, size, material) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.selectedSize === size &&
                item.selectedMaterial === material
              )
          ),
        }));
      },
      updateQuantity: (productId, size, material, quantity) => {
        if (quantity <= 0) {
          get().removeFromBag(productId, size, material);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedMaterial === material
              ? { ...item, quantity }
              : item
          ),
        }));
      },
      clearBag: () => set({ items: [] }),
      getTotalCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'aurenne_bag_storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
