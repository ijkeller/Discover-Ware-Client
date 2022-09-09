import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";
import React from "react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button  size="sm" variant="secondary"  className="logout-button" onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </Button>
  );
};

export default LogoutButton;