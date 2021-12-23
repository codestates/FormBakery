export const SET_USER_INFO = "SET_USER_INFO";
export const LOGOUT = "LOGOUT";
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
export const SET_REFRESH_TOKEN = "SET_REFRESH_TOKEN";
export const SET_ALERT = "SET_ALERT";
export const SET_MODAL = "SET_MODAL";
export const MODIFY_USER_INFO = "MODIFY_USER_INFO";

export const setUserInfo = (userInfo) => ({
    type: SET_USER_INFO,
    payload: userInfo,
});

export const logout = () => ({
    type: LOGOUT,
});

export const setAccessToken = (token) => ({
    type: SET_ACCESS_TOKEN,
    payload: token,
});

export const setRefreshToken = (token) => ({
    type: SET_REFRESH_TOKEN,
    payload: token,
});

export const setAlert = (boolean) => ({
    type: SET_ALERT,
    payload: boolean,
});

export const setModal = (boolean) => ({
    type: SET_MODAL,
    payload: boolean,
});

export const modifyUserInfo = (userInfo) => ({
    type: MODIFY_USER_INFO,
    payload: userInfo,
});

const initialState = {
    userInfo: {
        email: "",
        profilePicture: null,
        name: "",
        nickname: "",
        createdAt: "",
        updatedAt: "",
    },
    userToken: {
        accessToken: "",
        refreshToken: "",
    },
    login: false,
    alert: false,
    modal: false,
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_INFO: {
            return {
                ...state,
                userInfo: action.payload,
                login: true,
            };
        }

        case LOGOUT: {
            return {
                userInfo: {
                    email: "",
                    profilePicture: null,
                    name: "",
                    nickname: "",
                    createdAt: "",
                    updatedAt: "",
                },
                userToken: {
                    accessToken: "",
                    refreshToken: "",
                },
                login: false,
            };
        }

        case SET_ACCESS_TOKEN: {
            return {
                ...state,
                userToken: {
                    ...state.userToken,
                    accessToken: action.payload,
                },
            };
        }

        case SET_REFRESH_TOKEN: {
            return {
                ...state,
                userToken: {
                    ...state.userToken,
                    refreshToken: action.payload,
                },
            };
        }

        case SET_ALERT: {
            return {
                ...state,
                alert: action.payload,
            };
        }

        case SET_MODAL: {
            return {
                ...state,
                modal: action.payload,
            };
        }

        case MODIFY_USER_INFO: {
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    ...action.payload
                },
            };
        }

        default:
            return state;
    }
};

export default user;
