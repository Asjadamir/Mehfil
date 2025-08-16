import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";
import { refresh } from "@/api/internalApi";
import { setCsrf } from "@/store/csrfSlice";

const useAutoLogin = () => {
    const [loading, setloading] = useState(true);
    let dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            try {
                let response = await refresh();
                let { userId, avatar, email, name, username } =
                    response.data.data.user;
                let user = {
                    name,
                    avatar,
                    email,
                    username,
                    userId,
                    auth: response.data.data.auth,
                };
                dispatch(setUser(user));
                dispatch(setCsrf(response.data.data.csrfToken));
                // eslint-disable-next-line no-unused-vars
            } catch (error) {
                //
            } finally {
                setloading(false);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return loading;
};

export default useAutoLogin;
