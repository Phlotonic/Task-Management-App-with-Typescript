import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <button onClick={() => loginWithRedirect()}>
                Login
            </button>
        )
    );
}

export default Login;
