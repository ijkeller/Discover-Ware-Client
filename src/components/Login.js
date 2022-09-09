import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  // console.log('useAuth0: ')
// console.table(useAuth0.return)
  return <Button  size="sm" variant="secondary" onClick={() => loginWithRedirect()}>Log In</Button>;
};

export default LoginButton;