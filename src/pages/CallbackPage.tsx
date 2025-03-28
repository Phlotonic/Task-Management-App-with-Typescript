import { useAuth0 } from "@auth0/auth0-react";
import { Container, Col } from "react-bootstrap";
import NavBar from "../ui/NavBar";
const CallbackPage:React.FC = () =>{
    const { error, user }= useAuth0();
    if(error){
        return <div>Oops...{error.message}</div>
    }
    return(
            <Container>
                <h1>Welcome{user? `, ${user.given_name}!`:'!'}</h1>
            </Container>
    );
};
export default CallbackPage;