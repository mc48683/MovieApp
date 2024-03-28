import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice.js";
import themeModeSlice from "./features/themeModeSlice.js";
import authModalSlice from "./features/authModalSlice.js";
import globalLoadingSlice from "./features/globalLoadingSlice.js";
import appStateSlice from "./features/appStateSlice.js";


const store = configureStore({
    reducer: {
        user: userSlice,
        themeMode: themeModeSlice,
        authModal: authModalSlice,
        globalLoading: globalLoadingSlice,
        appState: appStateSlice
    }
});

export default store;