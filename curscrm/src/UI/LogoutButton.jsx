import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <div className="icons" onClick={() => logout({ returnTo: window.location.origin })}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 12L9 8" stroke="#CCD2E3" strokeWidth="2" strokeLinecap="round" />
        <path d="M2 12H16" stroke="#CCD2E3" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 3H20" stroke="#CCD2E3" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 21H20" stroke="#CCD2E3" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 3V21" stroke="#CCD2E3" strokeWidth="2" strokeLinecap="round" />
        <path d="M2 12L9 16" stroke="#CCD2E3" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export default LogoutButton;