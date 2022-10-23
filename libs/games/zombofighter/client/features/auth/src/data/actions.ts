import { createAsyncThunk } from "@reduxjs/toolkit";
import * as nearActions from "./near";
import { FeatureDispatch } from "./store.feature";

export enum AuthType {
    Near,
}


export const auth = createAsyncThunk<void,
    AuthType,
    { dispatch: FeatureDispatch }>("auth/system", async (type, { dispatch }) => {
    if (type === AuthType.Near) {
        await dispatch(nearActions.auth()).unwrap();
    }
});

export const checkAuth = createAsyncThunk<boolean, void, { dispatch: FeatureDispatch }>("auth/check", async (_, { dispatch }) => {
    const nearWalletSigned = await dispatch(nearActions.check()).unwrap()


    if (nearWalletSigned) {
        return true
    }

    return false
});
