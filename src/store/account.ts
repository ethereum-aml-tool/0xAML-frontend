import { atom } from "jotai";
import { atomWithQuery } from "jotai/query";
import { API_URL } from "../constants";

export const accountAddress = atom<string | undefined>(undefined);
export const accountData = atomWithQuery((get) => ({
  queryKey: ["account", get(accountAddress)],
  queryFn: async ({ queryKey: [, address] }) => {
    const response = await fetch(`${API_URL}/accounts/${address}`);
    return response.json();
  },
}));
