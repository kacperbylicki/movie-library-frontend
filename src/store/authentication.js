import { loginAccount, logoutAccount, refreshTokens, registerAccount } from "../services";

export const authentication = {
  state: {
    accessToken: null,
    refreshToken: null,
    user: null,
    isUserConfirmed: false,
    isAuthenticated: false,
    isAdmin: false,
    isModerator: false,
  },
  actions: {
    login: async ({ commit }, payload) => {
      const { accessToken, refreshToken, user, groups, error } = await loginAccount(payload);

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
      const { userConfirmed, destination, error } = await registerAccount(payload);

      if (!error) {
        commit("setUserConfirmationStatus", userConfirmed);
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
    // getCurrentUser: async ({ state, commit }) => {
    //     const { profile, uuid: accountId, email, error } = await getCurrentUser(state.accessToken);
    //
    //     if (!error) {
    //         commit("setProfile", profile);
    //         commit("setAccountId", accountId);
    //         commit("setEmail", email);
    //     }
    //
    //     return {
    //         error,
    //     };
    // },
    refreshToken: async ({ state, commit }) => {
      const { accessToken, refreshToken, error } = await refreshTokens(
        state.user.uuid,
        state.refreshToken,
      );

      if (!error) {
        commit("setTokens", { accessToken, refreshToken });
      }

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
    setUserConfirmationStatus: (state, userConfirmationStatus) => {
      state.isUserConfirmed = userConfirmationStatus;
    },
    clearAccountData: (state) => {
      state.refreshToken = null;
      state.accessToken = null;
      state.user = null;
      state.isUserConfirmed = false;
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.isModerator = false;
    },
  },
  getters: {
    accessToken: (state) => state.accessToken,
    refreshToken: (state) => state.refreshToken,
    user: (state) => state.user,
    isUserConfirmed: (state) => state.isUserConfirmed,
    isAuthenticated: (state) => state.isAuthenticated,
    isAdmin: (state) => state.isAdmin,
    isAdminOrModerator: (state) => state.isAdmin || state.isModerator,
  },
};
