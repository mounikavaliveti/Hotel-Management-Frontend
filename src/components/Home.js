import { Button } from 'react-bootstrap';
import logo from "../images/home.jpg";
const Home = () =>{

   
    return(
        <div className="home">
             <img className="homeImage" src={logo} alt="Beach Resort" />
        </div>
    )
}
export default Home;