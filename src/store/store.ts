import { atom } from "jotai";
import { atomWithQuery } from "jotai/query";
import { atomWithStorage } from "jotai/utils";
import { API_URL } from "../constants";

/*
    ACCOUNT
*/
export const accountAddress = atom<string | undefined>(undefined);
export const accountData = atomWithQuery((get) => ({
  queryKey: ["account", get(accountAddress)],
  queryFn: async ({ queryKey: [, address] }) => {
    const response = await fetch(`${API_URL}/accounts/${address}`);
    return response.json();
  },
}));

/*
    SEARCH
*/
export const recentSearchesAtom = atomWithStorage<string[]>(
  "recentSearches",
  []
);
