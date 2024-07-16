import { DialogEnum } from "@/lib/enums";
import { create } from "zustand";

interface DialogProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  type: DialogEnum;
  onChangeType: (type: DialogEnum) => void;
  data: any;
  setData: (data: any) => void;
}

export const useDialog = create<DialogProps>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
  type: DialogEnum.Initial,
  onChangeType: (type: DialogEnum) => set({ type: type }),
  data: null,
  setData: (data) => set({ data: data }),
}));
