import React, {useState } from "react";
import { Button, Form, Container } from 'react-bootstrap';
import Styles from '../App.css'
const Signup = () =>{

  const [values, setValues] = useState({ 
    username: '', password: '', empId: '', role: ''
  });
const[error, setError]=useState(false);
  const set = name => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({...oldValues, [name]: value }));
    }
  };

  const saveFormData = async () => {
    const response = await fetch('http://localhost:8003/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(values)
    });
    if (response.status !== 200) {
      setError(true);
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent default submission
    try {
      await saveFormData();
      setValues({
        username: '', password: '', empId: '', role: ''
      });
    } catch (e) {
      console.log(`Sign In failed! ${e.message}`);
    }
  }

    return(
        <Container fluid className="signIn">
        <Form onSubmit={onSubmit}>
        <Form.Group controlId="formBasicText" className="rightMargin">
    <Form.Label>Employee ID</Form.Label>
    <Form.Control type="text" placeholder="Enter EmpId" value={values.empId} onChange={set('empId')} />
  </Form.Group>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter Name" value={values.username} onChange={set('username')} />
  </Form.Group>
  {error &&<Form.Group controlId="formBasicText">
    <Form.Label>Mail address already taken!</Form.Label>
   </Form.Group>}

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" value={values.password} onChange={set('password')} />
  </Form.Group>
  <Form.Group controlId="formBasicText" className="rightMargin">
    <Form.Label>Role</Form.Label>
    
    <select className="form-control" placeholder="Enter Category" value={values.role} onChange={set('role')}>
                                        <option selected>Select Role</option>
                                        <option value="admin">admin</option>
                                        <option value="receptionist">receptionist</option>
                                        <option value="manager">manager</option>
                                    </select>
  </Form.Group>
  
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
</Container>
    )
}
export default Signup;