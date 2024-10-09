import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage,
});

export const dataState = atom<any[]>({
  key: "dataState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const chartIdState = atom<any[]>({
  key: "chartIdState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const chartDataState = atom<any[]>({
  key: "chartDataState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const pinnedChartsState = selector({
  key: "pinnedChartsState",
  get: ({ get }) => {
    const chartData = get(chartDataState);
    return chartData.filter(
      (result: { status: boolean }) => result?.status === true
    );
  },
});

// Activity log pinning
export const selectedLogTypeState = atom<string[]>({
  key: "selectedLogTypeState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
