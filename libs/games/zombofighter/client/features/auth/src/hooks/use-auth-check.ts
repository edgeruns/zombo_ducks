import { useFeatDispatch, useFeatSelector } from "../data/store.feature";
import { useEffect } from "react";
import { getStatus } from "../data/selectors";
import { checkAuth } from "../data/actions";

interface AuthCheckResult {
    checking: boolean
    authorized: boolean
}

export const useAuthCheck = (): AuthCheckResult => {
    const dispatch = useFeatDispatch()
    const status = useFeatSelector(getStatus)


    useEffect(() => {
        dispatch(checkAuth())
    }, [dispatch])

    return status
}
