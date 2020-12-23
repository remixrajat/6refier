import React from "react";
import { Col, Table } from "react-bootstrap";
import PieChart from 'react-minimal-pie-chart';

const Chart = (props) => {
    // console.log("char", props);
    return(
        <Col xs={3} style={{"background":"white", "padding":"10px 10px"}}>
            {props.data.quantityRemaining && props.data.quantityUsed?
            <PieChart paddingAngle={10} lineWidth={20} animate={true}
                style={{"padding":"10px 10px"}}
                lengthAngle={360}
                startAngle={-90}
                data={[{ value: props.data.quantityRemaining?props.data.quantityRemaining:0,
                             key: 1, color: '#48528C' },
                    { value: props.data.quantityUsed ? props.data.quantityUsed:0,
                             key: 2, color: '#f2f2f2' },
                ]}
            />
            :
            null
            }

        <div className="refier_custom_light_panel_title" 
            style={{ "border": "solid transparent 1px", borderBottomColor: "transparent",
                "padding":"5px 0px",
                "fontSize":"14px", minHeight:"60px"}}>{props.data.serviceName}</div>

            <Table responsive  style={{"padding":"0px 10px"}}>
                <tbody>
                    <tr>
                        <td>
                            <div className="refier_text_on_light__4" data-label="Name Key">
                                <p><span>{"Total"}</span></p>
                            </div>
                        </td>
                        <td>
                            <div className="refier_text_on_light__3" 
                                data-label="name value" style={{"fontSize":"14px"}}>
                                <p><span >{props.data.quantityAlloted?props.data.quantityAlloted:0}
                                </span></p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="refier_text_on_light__4" data-label="Used Key">
                                <p><span>{"Used"}</span></p>
                            </div>
                        </td>
                        <td>
                            <div className="refier_text_on_light__3" data-label="used value">
                                <p><span>{props.data.quantityUsed?props.data.quantityUsed:0}
                                </span></p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="refier_text_on_light__4" data-label="Remaining Key">
                                <p><span>{"Remaining"}</span></p>
                            </div>
                        </td>
                        <td>
                            <div className="refier_text_on_light__3" data-label="remaining value">
                                <p><span>{props.data.quantityRemaining?props.data.quantityRemaining:0}
                                </span></p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Col>

    );
}

const ServiceChart = (props) => {
    //console.log("service chart", props);
    const renderChart = (data) => {
        return(
            data.map( (item, i) => {
                return <Chart key={i} data={item}/>
            })
        );
    }

    return(
        <div>
            {renderChart(props.data)}
        </div>
    );
}

export default ServiceChart;

