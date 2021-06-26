import React, { useEffect, useState } from 'react';
import { Button, Container, Form, FormGroup } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const StaffEdit =()=> {
  let history = useHistory();
  const [values, setValues] = useState({ 
    name: '', empId: '', email: '', contactNo: '', Salary: '', dob:'',joinDate: '', endDate: '', id: null
  });

  const[title, setTitle]= useState('');
  const[operation, setOperation]=useState('');
  const {id} = useParams();
  const[data,setData] = useState({name: '', empId: '', email: '', contactNo: '', Salary: '', dob:'',joinDate: '', endDate: '', id: null});

useEffect(()=>{
  console.log("id"+id);
  if (id !== undefined) {
    fetchById();
  }
  setTitle(<Button>{id !== undefined? 'Edit Staff' : 'Add Staff'}</Button>);
  setOperation(id !== undefined? 'Update' : 'Submit');
},[]);

   const fetchById = async () => {
      axios.get(`http://localhost:8002/hotel/getstaff/byid/${id}`)
      .then(res => {
        const data = res.data;
        setValues({name:data.name,empId:data.empId,email:data.email,
          contactNo:data.contactNo,salary:data.salary,dob:data.dob,joinDate:data.joinDate,
          endDate:data.endDate,id:data.id});
      })
      
       
    console.log(values.id);
    console.log("name "+data.name);
   }

  const set = name => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({...oldValues, [name]: value }));
    }
  };

  const onSubmit= async (event) => {
    
    event.preventDefault();

    await fetch('http://localhost:8002/hotel/save/staff', {
     //method: (values.id == null) ? 'POST' : 'PUT',
     method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values),
    });
    history.push('/staff');
  }
    return <div>
      {/* <AppNavbar/> */}
      <Container className="staff">
        {title}
        <Form onSubmit={onSubmit}>
        {/* <Form.Row> */}
  <Form.Group controlId="formBasicText" className="rightMargin">
    <Form.Label>Name</Form.Label>
    <Form.Control type="text" placeholder="Enter Name" value={values.name} onChange={set('name')} />
  </Form.Group>
  <Form.Group controlId="formBasicText" className="rightMargin">
    <Form.Label>Employee ID</Form.Label>
    <Form.Control type="text" placeholder="Enter Employee ID" value={values.empId} onChange={set('empId')} />
  </Form.Group>
  <Form.Group controlId="formBasicText" className="rightMargin">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" placeholder="Enter Email" value={values.email} onChange={set('email')} />
  </Form.Group>
  <Form.Group controlId="formBasicText" className="rightMargin">
    <Form.Label>Contact No</Form.Label>
    <Form.Control type="number" placeholder="Enter Contact No" value={values.contactNo} onChange={set('contactNo')} />
  </Form.Group>
  <Form.Group controlId="formBasicText" className="rightMargin">
    <Form.Label>Salary</Form.Label>
    <Form.Control type="number" placeholder="Enter Salary" value={values.salary} onChange={set('salary')} />
  </Form.Group>
  <Form.Group controlId="formBasicText" className="rightMargin">
    <Form.Label>DOB</Form.Label>
    <Form.Control type="date" placeholder="Enter Date of Birth" value={values.dob} onChange={set('dob')} />
  </Form.Group>
  <Form.Group controlId="formBasicText" className="rightMargin">
    <Form.Label>Join Date</Form.Label>
    <Form.Control type="date" placeholder="Enter Join Date" value={values.joinDate} onChange={set('joinDate')} />
  </Form.Group>
  <Form.Group controlId="formBasicText">
    <Form.Label>End Date</Form.Label>
    <Form.Control type="date" placeholder="End Date" value={values.endDate} onChange={set('endDate')} />
  </Form.Group>
  {/* </Form.Row> */}
  <Button variant="primary" type="submit" className="buttonPosition">
    {operation}
  </Button>
   </Form>
</Container>
    </div>
  }


export default StaffEdit;