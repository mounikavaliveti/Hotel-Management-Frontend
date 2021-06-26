import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'react-bootstrap';
import { Link } from "react-router-dom";

const StaffList=()=> {

  const[staff, setStaff] = useState([]);

  useEffect(()=> {

    getStaffList();
     
  },[]);

  const getStaffList = async () => {
    console.log("called for staff")
    const response = await fetch('http://localhost:8002/hotel/getAll/staff');
    const data = await response.json();
    if (response.status !== 200) {
      console.log("failed to fetch staff");
    }
    console.log("called for staff"+ data)
    setStaff(data);
  }

  const remove = async (id)=> {
    await fetch(`http://localhost:8002/hotel/deletestaff/byid/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      console.log("Remove Done!");
      let updatedStaff = [...staff].filter(i => i.id !== id);
      setStaff(updatedStaff);
    });
  }


    const staffList = staff.map(staff => {
      return <tr key={staff.id}>
        <td style={{whiteSpace: 'nowrap'}}>{staff.name}</td>
        <td>{staff.empId}</td>
        <td>{staff.email}</td>
        <td>{staff.contactNo}</td>
        <td>{staff.salary}</td>
        <td>{staff.dob}</td>
        <td>{staff.joinDate}</td>
        <td>{staff.endDate}</td>
        <td>
          <ButtonGroup>
            
            <Link to={"/staff/" + staff.id}><Button className="buttonSpace" size="sm" className="editButton buttonSpace" >Edit</Button></Link>
            <Button size="sm" className="deleteButton" onClick={() => remove(staff.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <Container fluid className="staff">
          <div className="float-right">
            
            <Link to="staff/new"><Button className="addButton">Add Staff</Button></Link>
          </div>
          <h3>Staff List</h3>
          <Table className="mt-4 tableColor">
            <thead>
              <tr>
                <th width="20%">Name</th>
                <th width="10%">Employee ID</th>
                <th width="15%">Email</th>
                <th width="15%">Contact No</th>
                <th width="15%">Salary</th>
                <th width="15%">DOB</th>
                <th width="15%">Join Date</th>
                <th width="15%">End Date</th>
              </tr>
            </thead>
            <tbody>
            {staffList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }

export default StaffList;