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
import { useEffect, useState } from "react";
import EditService from "./EditForms/EditService";
const Services = () => {
  
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
  //get data
  const baseUrl='http://emc2db-001-site1.itempurl.com' 
  const urlGet='/api/Serviece/GetAllServices'
  const [data,setData]=useState([])
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
  //post data
  const urlPost='/api/Serviece/AddService'
  const [service,setService]=useState('')
  const [icon,setIcon]=useState('')

  const onhandelName=(e)=>{
    setService(e.target.value)
  }
  const onhandelIcon=(e)=>{
    setIcon(e.target.files[0])
  }
  const config = {     
    headers: { 'content-type': 'multipart/form-data' }
}
  const handelSubmit = (e) => {
    e.preventDefault();
    const formData=new FormData()
    formData.append('name',service)
    formData.append('icon',icon)
    console.log(icon);
    axios.post(`${baseUrl}${urlPost}`,formData,config).then(res=>{
      console.log(res.data);
    }).catch(err=>console.log(err)
    )
    setService('')
    setIcon('')
  };

  /////updated data
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const handleServiceClick = (id) => {
    setSelectedServiceId(id);
  };
  const findServiceById = (serviceId) => {
    return data.find((service) => service.serviceId === serviceId);
  };
  const EditServiceComponent = selectedServiceId && (
    <EditService
    form={form} toggleFom={toggleFom} data={findServiceById(selectedServiceId)}
    />
  );

  //delete record

  const handelDelete=(id)=>{
    axios.delete(`${baseUrl}/api/Serviece/DeleteService/${id}`)
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
            Add new Service
          </CardTitle>
          <CardBody>
            <Form onSubmit={(e)=>handelSubmit(e)}>
              <FormGroup>
                <Label for="serviceName">Service name</Label>
                <Input
                  id="serviceName"
                  name="name"
                  placeholder="Add Service name"
                  type="text"
                  value={service}
                  onChange={(e=>onhandelName(e))}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleFile">Add Icon</Label>
                <Input id="exampleFile" name="icon" type="file" 
                  onChange={(e=>onhandelIcon(e))}
                  />
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
                <CardTitle tag="h5"> Services we offer</CardTitle>
                <Table
                  className="no-wrap mt-3 align-middle"
                  responsive
                  borderless
                >
                  <thead>
                    <tr>
                      <th>Service name</th>
                      <th>Service Icon</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((i, index) => (
                      <tr key={index} className="border-top" onClick={()=>handleServiceClick(i.serviceId)} >
                        <td>
                          <div className="d-flex align-items-center p-2">
                            <div className="ms-3">
                              <h6 className="mb-0">{i.name}</h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          <img className="w-40" src={`data:image/svg+xml;base64,${i.icon}`} alt=""/>
                          <img className="w-50" src={`data:image/jpeg;charset=utf-8;base64,${i.icon}`} alt=""/>
                        </td>
                        
                        <td>
                          <button className="btn btn-primary" color="info"
                           onClick={toggleFom}>
                            Edit
                          </button>
                        </td>
                        <td>
                          <button className="btn btn-danger" color="danger" onClick={()=>handelDelete(i.serviceId)}>
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

      {EditServiceComponent}
    </Row>
  );
};

export default Services;
