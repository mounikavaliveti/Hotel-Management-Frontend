import React, {useState } from "react";
import { Button, Form, Container } from 'react-bootstrap';
import axios from "axios";
import { useHistory } from "react-router-dom";
const SignIn = ({setCred}) =>{

  const [values, setValues] = useState({ 
    username: '', password: ''
  });
  const[error,setError]=useState(false);
  let history = useHistory();
  const set = name => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({...oldValues, [name]: value }));
    }
  };

  const saveFormData = async () => {

    axios({
      method: 'post',
      headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'},
      url: 'http://localhost:8003/auth/signin',
      data: values,
    }).then(res => {
        
      setCred(true,res.data.role);
       localStorage.setItem("roles", res.data.role);
       localStorage.setItem("login", true);
       history.push('/');
   }).catch(error => { 
      setError(true);
      history.push('/signin');
   });
  }

  const onSubmit = (event) => {
    event.preventDefault(); 
    try {
      saveFormData();
      console.log('Your registration was successfully submitted!');
      setValues({
        username: '', password: ''
      });
    } catch (e) {
      console.log(`Log In failed! ${e.message}`);
    }
    
  }

    return(
        <Container fluid className="signIn">
        <Form onSubmit={onSubmit}>
        {/* <Form > */}
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" required placeholder="Enter email" value={values.username} onChange={set('username')} />
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" required placeholder="Password" value={values.password} onChange={set('password')} />
  </Form.Group>
  {error && <Form.Group controlId="formBasicText">
     <Form.Label>Invalid Username or Password</Form.Label>
    </Form.Group>
}
 
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
</Container>
    )
}
export default SignIn;