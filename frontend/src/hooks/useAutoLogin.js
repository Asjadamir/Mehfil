import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";
import { refresh } from "@/api/internalApi";

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
                    csrfToken: response.data.data.csrfToken,
                };
                dispatch(setUser(user));
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
