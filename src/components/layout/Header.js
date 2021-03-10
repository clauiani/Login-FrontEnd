import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";
import moduleName from "../auth/AuthOptions";
export default function Header() {
  return (
    <header id="header">
      <Link to="/">
        <h1 className="title">Mern auth to do</h1>
      </Link>
      <AuthOptions />
    </header>
  );
}
