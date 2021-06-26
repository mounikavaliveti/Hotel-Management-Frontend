import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'react-bootstrap';
import { Link } from "react-router-dom";

const InventoryList=()=> {

  const[inventory, setInventory] = useState([]);

  useEffect(()=> {

    getInventoryList();
     
  },[]);

  const getInventoryList = async () => {
    console.log("called for Inventory")
    const response = await fetch('http://localhost:8002/hotel/getAll/inventory');
    const data = await response.json();
    if (response.status !== 200) {
      console.log("failed to fetch inventory");
    }
    console.log("called for staff"+ data)
    setInventory(data);
  }

  const remove = async (id)=> {
    await fetch(`http://localhost:8002/hotel/deleteinventory/byid/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      console.log("Remove Done!");
      let updatedInventory = [...inventory].filter(i => i.id !== id);
      setInventory(updatedInventory);
    });
  }


    const inventoryList = inventory.map(inventory => {
      return <tr key={inventory.id}>
        <td style={{whiteSpace: 'nowrap'}}>{inventory.name}</td>
        <td>{inventory.quantity}</td>
        <td>{inventory.price}</td>
        <td>
          <ButtonGroup>
            
            <Link to={"/inventory/" + inventory.id}><Button className="buttonSpace" size="sm" className="editButton buttonSpace" >Edit</Button></Link>
            <Button size="sm" className="deleteButton" onClick={() => remove(inventory.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <Container fluid className="staff">
          <div className="float-right">
            
            <Link to="inventory/new"><Button className="addButton">Add Inventory</Button></Link>
          </div>
          <h3>Staff List</h3>
          <Table className="mt-4 tableColor">
            <thead>
              <tr>
                <th width="20%">Name</th>
                <th width="10%">Quantity</th>
                <th width="15%">Price</th>
              </tr>
            </thead>
            <tbody>
            {inventoryList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }

export default InventoryList;