import { createSelector } from "@reduxjs/toolkit";
import { FeatureState } from "./store.feature";

export const getStatus = createSelector(
    (state: FeatureState) => state.auth,
    (auth) => auth
)
