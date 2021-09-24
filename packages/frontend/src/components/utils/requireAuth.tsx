import React from "react";
import { Redirect } from "react-router-dom";

export function withAuthentication<P = Record<string, unknown>>(
  Component: React.ComponentType<P>,
  isAuth: boolean
): React.FC<P> {
  if (isAuth) {
    const WrappedComponent: React.FC<P> = (props) => <Component {...props} />;
    WrappedComponent.displayName = `withAuthentication(${Component.displayName})`;
    return WrappedComponent;
  } else {
    const WrappedComponent: React.FC<P> = () => (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
    return WrappedComponent;
  }
}
export default withAuthentication;
