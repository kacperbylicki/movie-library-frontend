import {
  confirmAccount,
  loginAccount,
  logoutAccount,
  refreshTokens,
  registerAccount,
} from "../services";

export const authentication = {
  state: {
    accessToken: null,
    refreshToken: null,
    user: null,
    isAccountConfirmed: true,
    isAuthenticated: false,
    isAdmin: false,
    isModerator: false,
  },
  actions: {
    login: async ({ commit }, payload) => {
      const { accessToken, refreshToken, user, groups, error } = await loginAccount(payload);

      if (!user?.accountVerified || error?.title === "Account not confirmed") {
        commit("setAccountConfirmationStatus", false);
        commit("setUser", { email: payload.email });
      }

      if (!error) {
        commit("setTokens", { accessToken, refreshToken });
        commit("setUser", user);
        commit("setPermissions", groups);
      }

      return {
        error,
      };
    },
    register: async ({ commit }, payload) => {
      const { isUserConfirmed, destination, error } = await registerAccount(payload);

      if (!error) {
        commit("setAccountConfirmationStatus", isUserConfirmed);
        commit("setUser", { email: payload.email });
      }

      return {
        destination,
        error,
      };
    },
    logout: async ({ state, commit }) => {
      const { error } = await logoutAccount(state);

      if (!error) {
        commit("clearAccountData");
      }

      return {
        error,
      };
    },
    confirmAccount: async ({ state, commit }, payload) => {
      const { userConfirmed, error } = await confirmAccount({
        ...payload,
        email: state.user.email,
      });

      if (error?.title === "Account has been already confirmed") {
        commit("setAccountConfirmationStatus", true);

        return {};
      }

      if (!error) {
        commit("setAccountConfirmationStatus", userConfirmed);
      }

      return {
        error,
      };
    },
    refreshToken: async ({ state, commit }) => {
      const { accessToken, refreshToken, error } = await refreshTokens(
        state?.user?.uuid,
        state?.refreshToken,
      );

      if (!error) {
        commit("setTokens", { accessToken, refreshToken });

        return;
      }

      commit("clearAccountData");

      return {
        error,
      };
    },
  },
  mutations: {
    setTokens: (state, { accessToken, refreshToken }) => {
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = !!accessToken && !!refreshToken;
    },
    setUser: (state, user) => {
      state.user = user;
    },
    setPermissions: (state, groups) => {
      state.isAdmin = groups.includes("admin");
      state.isModerator = groups.includes("moderator");
    },
    setAccountConfirmationStatus: (state, accountConfirmationStatus) => {
      state.isAccountConfirmed = accountConfirmationStatus;
    },
    clearAccountData: (state) => {
      state.refreshToken = null;
      state.accessToken = null;
      state.user = null;
      state.isAccountConfirmed = true;
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.isModerator = false;
      state.favoriteMovies = [];
    },
  },
  getters: {
    accessToken: (state) => state.accessToken,
    refreshToken: (state) => state.refreshToken,
    user: (state) => state.user,
    isAccountConfirmed: (state) => state.isAccountConfirmed,
    isAuthenticated: (state) => state.isAuthenticated,
    isAdmin: (state) => state.isAdmin,
    isAdminOrModerator: (state) => state.isAdmin || state.isModerator,
  },
};
