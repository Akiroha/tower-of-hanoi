import { create } from 'zustand';
import { ApiDataType } from '@/types';

interface HanoiProps {
  diskNumber: number | undefined;
  pageIndex: number;
  data: ApiDataType | undefined;
  selectedStepIndex: number | undefined;
  loading: boolean;
  hasNext: boolean;
  hasPrev: boolean;

  setDiskNumber: (diskNumber: number) => void;
  setPageIndex: (pageIndex: number) => void;
  setData: (data: ApiDataType | undefined) => void;
  setSelectedStepIndex: (selectedStepIndex: number | undefined) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

export default create<HanoiProps>((set, get) => ({
  diskNumber: undefined,
  pageIndex: 0,
  data: undefined,
  selectedStepIndex: undefined,
  loading: false,
  hasNext: false,
  hasPrev: false,

  setDiskNumber: (diskNumber: number) => {
    set({ diskNumber });
  },
  setPageIndex: (pageIndex: number) => {
    set({ pageIndex });
  },
  setData: (data: ApiDataType | undefined) => {
    const { pageCount } = data || {};
    const page = get().pageIndex + 1;
    set({
      data,
      hasNext: pageCount ? page < pageCount : false,
      hasPrev: page > 1,
    });
  },
  setSelectedStepIndex: (selectedStepIndex: number | undefined) => {
    set({ selectedStepIndex });
  },
  setLoading: (loading: boolean) => {
    set({ loading });
  },
  reset: () => {
    set({
      diskNumber: undefined,
      data: undefined,
      selectedStepIndex: undefined,
    });
  },
}));
