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

const Messages = () => {
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
      {/* tabel */}
      <Row>
        <Col lg="12">
          <div>
            <Card>
              <CardBody>
                <CardTitle tag="h5">Messages</CardTitle>
                <Table
                  className="no-wrap mt-3 align-middle"
                  responsive
                  borderless
                >
                  <thead>
                    <tr>
                      <th>Client Name</th>
                      <th>Client Email</th>
                      <th>Message</th>
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
                        <td>{tdata.email}</td>
                        <td>{tdata.project}</td>
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

export default Messages;
