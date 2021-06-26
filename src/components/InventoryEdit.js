import React, { useEffect, useState } from 'react';
import { Button, Container, Form, FormGroup } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const StaffEdit =()=> {
  let history = useHistory();
  const [values, setValues] = useState({ 
    name: '', quantity: '', price: '', id: null
  });

  const[title, setTitle]= useState('');
  const[operation, setOperation]=useState('');
  const {id} = useParams();
  const[data,setData] = useState({name: '', quantity: '', price: '', id: null});

useEffect(()=>{
  console.log("id"+id);
  if (id !== undefined) {
    fetchById();
  }
  setTitle(<Button>{id !== undefined? 'Edit Inventory' : 'Add Inventory'}</Button>);
  setOperation(id !== undefined? 'Update' : 'Submit');
},[]);

   const fetchById = async () => {
    
      axios.get(`http://localhost:8002/hotel/getinventory/byid/${id}`)
      .then(res => {
        const data = res.data;
        setValues({name:data.name,quantity:data.quantity,price:data.price,id:data.id});
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

    await fetch('http://localhost:8002/hotel/save/inventory', {
     method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values),
    });
    history.push('/inventory');
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
    <Form.Label>Quantity</Form.Label>
    <Form.Control type="number" placeholder="Enter Quantity" value={values.quantity} onChange={set('quantity')} />
  </Form.Group>
  <Form.Group controlId="formBasicText" className="rightMargin">
    <Form.Label>Price</Form.Label>
    <Form.Control type="number" placeholder="Enter Price" value={values.price} onChange={set('price')} />
  </Form.Group>
    <Button variant="primary" type="submit" className="buttonPosition">
    {operation}
  </Button>
   </Form>
</Container>
    </div>
  }


export default StaffEdit;