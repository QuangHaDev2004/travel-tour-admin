/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchMeService, logoutService, refreshService } from "@/services/auth";
import type { AuthState } from "@/types/store";
import { toast } from "sonner";
import { create } from "zustand";

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  account: null,
  loading: false,

  clearState: () =>
    set({
      accessToken: null,
      account: null,
      loading: false,
    }),
  setAccessToken: (accessToken: string) => set({ accessToken }),
  setAccount: (account: any) => set({ account }),

  logout: async () => {
    const data = await logoutService();
    get().clearState();
    toast.success(data.message);
  },

  fetchMe: async () => {
    try {
      set({ loading: true });

      const data = await fetchMeService();
      get().setAccount(data.account);
    } catch (error) {
      console.log(error);
      get().clearState();
    } finally {
      set({ loading: false });
    }
  },

  refresh: async () => {
    try {
      set({ loading: true });
      const { account, fetchMe } = get();

      const data = await refreshService();
      get().setAccessToken(data.accessToken);

      if (!account) await fetchMe();
    } catch (error) {
      console.log(error);
      toast.error("Phiên đăng nhập đã hết hạn.");
      get().clearState();
    } finally {
      set({ loading: false });
    }
  },
}));
