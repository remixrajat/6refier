import React from 'react';
import { Grid, Col, Row, Tab, Tabs, ButtonGroup, Button } from 'react-bootstrap';
import 'react-table/react-table.css'
import FontAwesome from 'react-fontawesome';
import { LineChart } from 'react-d3-basic';
import { Chart, d3 } from 'react-d3-core';
import ReactTable from 'react-table'
import 'react-table/react-table.css'


class TeacherPerformance extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEdit: false
        };
    }

    weightedAverage(testDetails, count) {
        let testPerformance = 0;
        if (testDetails.TestDetails) {
            for (let i = 0; i < testDetails.TestDetails.length; i++) {
                testPerformance = testPerformance + parseInt(testDetails.TestDetails[i].Marks)
            }
            if (testDetails.TestDetails.length != 0)
               { testPerformance = testPerformance*100 / 
                                (testDetails.TestDetails.length * parseInt(testDetails.MaxMarks))
               }
        }
        //console.log("TestDetaills",testDetails)
        //console.log("TestPErformance",testPerformance)
        let classPerformance = {}
        classPerformance["performance"] = testPerformance
        classPerformance["test"] = count
        classPerformance["testname"] = testDetails.TestName
        return classPerformance;
    }

    performance(row) {
        //console.log("teacherPerformance123 ::",row)
        let performanceMetricsList = []
        let chartSeries = []
        let count = 0
        if (row.SubjectTestDetails) {
            for (let i = 0; i < row.SubjectTestDetails.length; i++) {
                if (!row.SubjectTestDetails[i].Tests){
                    continue;
                }
                let performance = []

                for (let j = 0; j < row.SubjectTestDetails[i].Tests.length; j++) {
                    let testPerformance = 0;
                    if (row.SubjectTestDetails[i].Tests[j].TestDetails) {
                        testPerformance =
                            this.weightedAverage(row.SubjectTestDetails[i].Tests[j], j)
                        
                        performance.push(testPerformance)
                    }
                }
                //console.log("teacherPerformance123",performance)
                if(performanceMetricsList.length>=0){
                    if(performanceMetricsList.length>=performance.length){
                        for(let x=0;x<performance.length;x++){
                            
                            performanceMetricsList[x][row.SubjectTestDetails[i].SubjectBatch] = 
                                                row.SubjectTestDetails[i].SubjectBatch
                            performanceMetricsList[x][row.SubjectTestDetails[i].SubjectBatch + "Performance"] = 
                                            performance[x].performance
                            //console.log("Pushing into existing element1",performanceMetricsList[x])
                        }
                    }
                    else{
                        for(let x=0;x<performanceMetricsList.length;x++){
                            performanceMetricsList[x][row.SubjectTestDetails[i].SubjectBatch] = 
                                                row.SubjectTestDetails[i].SubjectBatch
                            performanceMetricsList[x][row.SubjectTestDetails[i].SubjectBatch + "Performance"] = 
                                            performance[x].performance
                            //console.log("Pushing into existing element2",performanceMetricsList[x])
                        }
                        let size = performance.length-performanceMetricsList.length
                        for(let x=0;x<(size);x++){
                            let performanceMetrics = {}
                            performanceMetrics[row.SubjectTestDetails[i].SubjectBatch] = 
                                        row.SubjectTestDetails[i].SubjectBatch
                            performanceMetrics[row.SubjectTestDetails[i].SubjectBatch + "Performance"] = 
                                            performance[x].performance
                            performanceMetrics["test"] = performanceMetricsList.length
                            performanceMetrics["TestName"] = performance[x].testname
                            performanceMetricsList.push(performanceMetrics)
                            //console.log("Pushing a new element",performanceMetrics)
                        }
                    }
                }
                let chartSetting = {
                    field: row.SubjectTestDetails[i].SubjectBatch + "Performance",
                    name:  row.SubjectTestDetails[i].SubjectBatch,
                    color: this.getRandomColor(),
                    style: {
                        "stroke-width": 1,
                        "stroke-opacity": .2,
                        "fill-opacity": .2
                    }
                }
                chartSeries.push(chartSetting)
            }
        }
        //console.log("teacherPerformance123 Performance List",performanceMetricsList)

        return (
            <Grid fluid>
                <Col xs={12}>
                    <LineChart
                        /* width={700} */
                        height={200}
                        data={performanceMetricsList}
                        chartSeries={chartSeries}
                        x={this.x}
                        showXGrid= {false}
                        showYGrid= {false}
                        showLegend={true}
                        showXAxis = {false}
                        showYAxis = {false}
                        xLabel = "Test"
                        xScale = 'ordinal'
                        yLabel = "Relative Performance"
                    />
                </Col>
            </Grid>)
    }

    x = function (d) {
        return d.TestName;
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return this.darken(color,20);
      }

     subtractLight(color, amount){
        let cc = parseInt(color,16) - amount;
        let c = (cc < 0) ? 0 : (cc);
        c = (c.toString(16).length > 1 ) ? c.toString(16) : `0${c.toString(16)}`;
        return c;
      }

      darken(color, amount){
        color = (color.indexOf("#")>=0) ? color.substring(1,color.length) : color;
        amount = parseInt((255*amount)/100);
        return color = `#${this.subtractLight(color.substring(0,2), amount)}${this.subtractLight(color.substring(2,4), amount)}${this.subtractLight(color.substring(4,6), amount)}`;
      }

    render() {

        let teacherPerformance = this.props.teacherPerformanceData
        //console.log("teacherPerformance123 ::",teacherPerformance);

        let performanceTableColumns = [
            {
                Header: props => <span className="refier_text_on_light__3" >Teacher Name</span>,
                id: "teacherName",
                accessor: row => row.TeacherName,
                maxWidth: 100
            },
            {
                Header: props => <span className="refier_text_on_light__3" >Performance</span>,
                id: "teacherPerformance",
                accessor: row => this.performance(row),
                filterable: false
            },
        ]

        // var chartData = [
        //     {
        //         name: "Lavon Hilll I",
        //         BMI: 20.57,
        //         age: 12,
        //         birthday: "1994-10-26T00:00:00.000Z",
        //         city: "Annatown",
        //         married: true,
        //         index: 1
        //     },
        //     {
        //         name: "Clovis Pagac",
        //         BMI: 24.28,
        //         age: 26,
        //         birthday: "1995-11-10T00:00:00.000Z",
        //         city: "South Eldredtown",
        //         married: false,
        //         index: 3
        //     },
        //     {
        //         name: "Gaylord Paucek",
        //         BMI: 24.41,
        //         age: 30,
        //         birthday: "1975-06-12T00:00:00.000Z",
        //         city: "Koeppchester",
        //         married: true,
        //         index: 5
        //     },
        //     {
        //         name: "Ashlynn Kuhn MD",
        //         BMI: 23.77,
        //         age: 32,
        //         birthday: "1985-08-09T00:00:00.000Z",
        //         city: "West Josiemouth",
        //         married: false,
        //         index: 6
        //     }]

        // var chartSeries = [
        //     {
        //         field: 'age',
        //         name: 'Performance',
        //         color: '#ff7f0e',
        //         style: {
        //             "stroke-width": 2,
        //             "stroke-opacity": .2,
        //             "fill-opacity": .2
        //         }
        //     }
        // ],
        //     x = function (d) {
        //         return d.index;
        //     }

        return (
            <Grid fluid>
                <Col xs={12} style={{ "margin": "20px 20px" }}>
                    {/* <LineChart
                        width={700}
                        height={300}
                        data={chartData}
                        chartSeries={chartSeries}
                        x={x}
                    /> */}
                    <ReactTable
                        data={teacherPerformance}
                        columns={performanceTableColumns}
                        defaultPageSize={5}
                        filterable
                    />
                </Col>
            </Grid>
        );
    }
}

export default TeacherPerformance;
