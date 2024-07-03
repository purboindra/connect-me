import create from "zustand";

interface DialogProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useDialog = create<DialogProps>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
