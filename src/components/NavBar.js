import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <p>
            <Link className="navItem" to="/">Home</Link>&nbsp;&nbsp;<Link className="navItem" to="/about">About</Link>
        </p>
    );
}