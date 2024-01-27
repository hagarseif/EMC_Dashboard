import { useState } from "react";
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

const Products = () => {
  const [text, setText] = useState([1]);
  
  const addTech=()=>{
    const add=[...text,[]]
    setText(add)
  }
  const tableData = [
    {
      name: "Hanna Gover",
      email: "hgover@gmail.com",
      project: "Flexy React",
      status: "pending",
      weeks: "35",
      budget: "95K",
    },
    {
      name: "Hanna Gover",
      email: "hgover@gmail.com",
      project: "Lading pro React",
      status: "done",
      weeks: "35",
      budget: "95K",
    },
    {
      name: "Hanna Gover",
      email: "hgover@gmail.com",
      project: "Elite React",
      status: "holt",
      weeks: "35",
      budget: "95K",
    },
    {
      name: "Hanna Gover",
      email: "hgover@gmail.com",
      project: "Flexy React",
      status: "pending",
      weeks: "35",
      budget: "95K",
    },
    {
      name: "Hanna Gover",
      email: "hgover@gmail.com",
      project: "Ample React",
      status: "done",
      weeks: "35",
      budget: "95K",
    },
  ];
  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Add new Product
          </CardTitle>
          <CardBody>
            <Form>
              <FormGroup>
                <Label for="productName">Product name</Label>
                <Input
                  id="productName"
                  name="product"
                  placeholder="Add Product name"
                  type="text"
                />
                <Label for="tech">Technology</Label>
                {
                  text.map((d,i)=>{
                    return(
                      <Input key={i}
                      id="tech"
                      name="tech"
                      placeholder="Add Technology name"
                      type="text"
                      className="mt-2"
                    />
                    )
                  })
                }
                     
                
                <Button
                  className="btn mt-2"
                  color="primary"
                  onClick={() => addTech()}
                >
                  Add another tech
                </Button>
              </FormGroup>
              <FormGroup>
                <Label for="exampleFile">Add Image</Label>
                <Input id="exampleFile" name="file" type="file" />
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
                <CardTitle tag="h5">Our Products</CardTitle>
                <Table
                  className="no-wrap mt-3 align-middle"
                  responsive
                  borderless
                >
                  <thead>
                    <tr>
                      <th>Product name</th>
                      <th>Product image</th>
                      <th>Technologies</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((tdata, index) => (
                      <tr key={index} className="border-top">
                        <td>
                          <div className="d-flex align-items-center p-2">
                            <div className="ms-3">
                              <h6 className="mb-0">{tdata.name}</h6>
                            </div>
                          </div>
                        </td>
                        <td>{tdata.project}</td>
                        <td>{tdata.project}</td>
                        <td>
                          <Button className="btn" color="info">
                            Edit
                          </Button>
                        </td>
                        <td>
                          <Button className="btn" color="danger">
                            Delete
                          </Button>
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
    </Row>
  );
};

export default Products;
