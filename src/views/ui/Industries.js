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
import EditIndustry from "./EditForms/EditIndustry";

const Industries = () => {
  //add another technology for hover
  const [techFields, setTechFields] = useState([1]);

  const addTech = () => {
    setTechFields([...techFields,[]]);
    console.log(techFields);
  };
  
  ///////////post data//////////////////
  const baseUrl='http://emc2db-001-site1.itempurl.com' 
  const urlPost='/api/Industry/AddIndustry'
  const [industry,setIndustry]=useState('')
  const [icon,setIcon]=useState('')
  const [tech,setTech]=useState([])

  const onhandelName=(e)=>{
    setIndustry(e.target.value)
  }

  const onhandelTech=(e)=>{
    const newTech = e.target.value; 
      setTech([ newTech]);
    
  }
  const onhandelIcon=(e)=>{
    setIcon(e.target.files[0])
  }
  const config = {     
    headers: { 'content-type': 'multipart/form-data' }
}
  const handelSubmit = (e) => {
    // e.preventDefault();
    const formData=new FormData()
    formData.append('name',industry)
    formData.append('descriptionLines',tech)
    formData.append('icon',icon)
    axios.post(`${baseUrl}${urlPost}`,formData,config).then(res=>{
      console.log(res.data);
    }).catch(err=>console.log(err)
    )
    setIndustry('')
    setTech([])
    setIcon('')
  };
  //////////////////get data/////////////
  const [data,setData]=useState([])
  const urlGet='/api/Industry/GetAlIndustries'

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
  const [selectedIndustryId, setSelectedIndustryId] = useState(null);
  const handleServiceClick = (id) => {
    setSelectedIndustryId(id);
  };
  const findServiceById = (industryId) => {
    return data.find((service) => service.industryId === industryId);
  };
  const EditIndustryComponent = selectedIndustryId && (
    <EditIndustry
    form={form} toggleFom={toggleFom} data={findServiceById(selectedIndustryId)}
    />
  );

  ////////////delete record////////////////////
  const handelDelete=(id)=>{
    axios.delete(`${baseUrl}/api/Industry/DeleteIndustry/${id}`)
    .then((res)=>{
      console.log(res.data);
    })
  }


  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2 pe"> </i>
            Add new Industry
          </CardTitle>
          <CardBody>
            <Form onSubmit={(e)=>handelSubmit(e)}>
              <FormGroup>
                <Label for="industryName">Industry name</Label>
                <Input
                  id="industryName"
                  name="name"
                  placeholder="Add Industry name"
                  type="text"
                  onChange={(e)=>onhandelName(e)}
                  value={industry}
                />
                <Label for="tech">Technology</Label>
                
                  {
                  techFields.map((field,i) => (
                    <Input
                      key={i}
                      id={i}
                      name="descriptionLines"
                      placeholder="Add Technology name"
                      type="text"
                      className="mt-2"
                      onChange={(e) => onhandelTech(e)}
                      value={field.value}
                    />
                  ))
                }
                <Button
                  className="btn mt-2 btn-primary"
                  color="primary"
                  onClick={ addTech}>
                  Add another tech
                </Button>
              </FormGroup>
              <FormGroup>
                <Label for="exampleFile">Add Icon</Label>
                <Input id="exampleFile" name="icon" type="file" onChange={e=>onhandelIcon(e)}/>
              </FormGroup>
              <Button className="btn mt-2 btn-primary" color="primary">
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
                <CardTitle tag="h5">Industries We Serve</CardTitle>
                <Table
                  className="no-wrap mt-3 align-middle"
                  responsive
                  borderless
                >
                  <thead>
                    <tr>
                      <th>Industry name</th>
                      <th>Industry Icon</th>
                      <th>Technologies</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((tdata, index) => (
                      <tr key={index} className="border-top" onClick={()=>handleServiceClick(tdata.industryId)}>
                        <td>
                          <div className="d-flex align-items-center p-2">
                            <div className="ms-3">
                              <h6 className="mb-0">{tdata.name}</h6>
                            </div>
                          </div>
                        </td>
                        <td><img className="w-40" src={`data:image/svg+xml;base64,${tdata.icon}`} alt=""/>
                          <img className="w-50" src={`data:image/jpeg;charset=utf-8;base64,${tdata.icon}`} alt=""/></td>
                        <td>{tdata.descriptionLines.map((d,i)=>(<p key={i}>{d}</p>))}
                          </td>
                        <td>
                          <button className="btn btn-primary" color="info" onClick={toggleFom}>
                            Edit
                          </button>
                        </td>
                        <td>
                          <button className="btn btn-danger" color="danger" onClick={()=>handelDelete(tdata.industryId)}>
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
      {EditIndustryComponent}
    </Row>
  );
};

export default Industries;
