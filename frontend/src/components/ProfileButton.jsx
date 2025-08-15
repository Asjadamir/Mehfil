import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const ProfileButton = () => {
    let user = useSelector((state) => state.user);
    let avatar = user.avatar || "/default_profile_img.jpg";
    return user.auth ? (
        <Link to="">
            <div
                className="rounded-full h-9 w-9 shadow-md shadow-primary bg-center bg-cover"
                style={{ backgroundImage: `url(${avatar})` }}
            ></div>
        </Link>
    ) : (
        <Link to="/login">
            <Button variant="default">Log in</Button>
        </Link>
    );
};

export default ProfileButton;
