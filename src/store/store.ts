import { atom } from "jotai";
import { atomWithQuery } from "jotai/query";
import { atomWithStorage } from "jotai/utils";
import { API_URL } from "../constants";

/*
    ACCOUNT
*/
export const accountAddressAtom = atom<string | undefined>(undefined);
export const blacklistSummaryAtom = atomWithQuery((get) => ({
  queryKey: ["account", get(accountAddressAtom)],
  queryFn: async ({ queryKey: [, address] }) => {
    if (address !== undefined) {
      const response = await fetch(`${API_URL}/blacklist/summary/${address}`);
      return response.json();
    }
  },
}));
export const balanceAtom = atomWithQuery((get) => ({
  queryKey: ["balance", get(accountAddressAtom)],
  queryFn: async ({ queryKey: [, address] }) => {
    if (address !== undefined) {
      const response = await fetch(`${API_URL}/etherscan/balance/${address}`);
      return response.json();
    }
  },
}));
export const graphAtom = atomWithQuery((get) => ({
  queryKey: ["darGraph", get(accountAddressAtom)],
  queryFn: async ({ queryKey: [, address] }) => {
    if (address !== undefined) {
      const response = await fetch(
        `${API_URL}/cluster/get-dar/?address=${address}`
      );
      return response.json();
    }
  },
}));

/*
    SEARCH
*/
export const recentSearchesAtom = atomWithStorage<string[]>(
  "recentSearches",
  []
);

/*
    MISC
*/
export const serverStatusAtom = atomWithQuery(() => ({
  queryKey: ["serverStatus"],
  queryFn: async () => {
    const response = await fetch(`${API_URL}/health`);

    if (response.status === 200) {
      return true;
    }

    return false;
  },
  initialData: true,
}));
