import { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
} from "reactstrap";
import axios from "axios";
import EditTeam from "./EditForms/EditTeam";

const Team = () => {
  ///////////post data//////////////////
const baseUrl='http://emc2db-001-site1.itempurl.com' 
const urlPost='/api/TeamMember/AddMember'
const [industry,setIndustry]=useState('')
const [image,setImage]=useState('')
const [job,setJob]=useState("")

const onhandelName=(e)=>{
  setIndustry(e.target.value)
}

const onhandelJob=(e)=>{
  const newTech = e.target.value; 
  setJob([ newTech]);
  
}
const onhandelIcon=(e)=>{
  setImage(e.target.files[0])
}
const config = {     
  headers: { 'content-type': 'multipart/form-data' }
}
const handelSubmit = (e) => {
  e.preventDefault();
  const formData=new FormData()
  formData.append('name',industry)
  formData.append('title',job)
  formData.append('image',image)
  axios.post(`${baseUrl}${urlPost}`,formData,config).then(res=>{
    console.log(res.data);
  }).catch(err=>console.log(err)
  )
  setIndustry('')
  setJob('')
  setImage('')
};
  //////////////////get data/////////////
  const [data,setData]=useState([])
  const urlGet='/api/TeamMember/GetAllMembers'

  useEffect(() => {
    // Make a GET request to fetch text data
    axios.get(`${baseUrl}${urlGet}`)
      .then(response => {
        // Handle text data
        setData(response.data);
      })
      .catch(error => {
        console.error("Error fetching text data:", error);
      });
  }, []);
   //////////////update data//////////////
  
  //popup form
  const [form,setForm]=useState(false)
  //toggle form
  const toggleFom=()=>{
    setForm(!form)
  }
  //stop scrolling
  if(form){
    document.body.classList.add('active')
  }
  else{
    document.body.classList.remove('active')
  }
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const handleServiceClick = (id) => {
    setSelectedTeamId(id);
  };
  const findServiceById = (teamMemberId) => {
    return data.find((team) => team.teamMemberId === teamMemberId);
  };
  const EditTeamComponent = selectedTeamId && (
    <EditTeam
    form={form} toggleFom={toggleFom} data={findServiceById(selectedTeamId)}
    />
  );

    ////////////delete record////////////////////
    const handelDelete=(id)=>{
      axios.delete(`${baseUrl}/api/TeamMember/DeleteMember/${id}`)
      .then((res)=>{
        console.log(res.data);
      })
    }

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Add new Member
          </CardTitle>
          <CardBody>
            <Form onSubmit={handelSubmit}>
              <FormGroup>
                <Label for="membereName">Member name</Label>
                <Input
                  id="memberName"
                  name="service"
                  placeholder="Add Member name"
                  type="text"
                  onChange={onhandelName}
                />
              </FormGroup>
              <FormGroup>
                <Label for="jobTitle">Job title</Label>
                <Input
                  id="jobTitle"
                  name="job"
                  placeholder="Add Job title"
                  type="text"
                  onChange={onhandelJob}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleFile">Add Image</Label>
                <Input id="exampleFile" name="file" type="file" onChange={onhandelIcon}/>
              </FormGroup>
              <Button className="btn mt-2" color="primary">
                Add
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
      {/* tabel */}
      <Row>
        <Col lg="12">
          <div>
            <Card>
              <CardBody>
                <CardTitle tag="h5"> Our Team</CardTitle>
                <Table
                  className="no-wrap mt-3 align-middle"
                  responsive
                  borderless
                >
                  <thead>
                    <tr>
                      <th>Member name</th>
                      {/* <th>Photo</th> */}
                      <th>Job Title</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((tdata, index) => (
                      <tr key={index} className="border-top" onClick={()=>handleServiceClick(tdata.teamMemberId)}>
                        <td>
                          <div className="d-flex align-items-center p-2">
                            <img
                            src={`data:image/jpeg;charset=utf-8;base64,${tdata.image}`}
                              className="rounded-circle"
                              alt="avatar"
                              width="45"
                              height="45"
                            />
                              <h6 className="mb-0 ms-3">{tdata.name}</h6>
                          </div>
                        </td>
                        <td>{tdata.title}</td>
                        <td>
                          <button className="btn btn-primary" color="info" onClick={toggleFom}>
                            Edit
                          </button>
                        </td>
                        <td>
                          <button className="btn btn-danger" color="danger" onClick={()=>handelDelete(tdata.teamMemberId)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </div>
        </Col>
      </Row>
      {EditTeamComponent}
    </Row>
  );
};

export default Team;
