import React, { Component } from "react";
import "redux";
import { connect } from "react-redux";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


export default class CommunityReports extends Component {
    render() {
        const options = {
            chart: {
                type: 'column',
            },
            title: {
                text: 'Program Attendence'
            },
            xAxis: {
                categories: [
                    'Module-1',
                    'Module-2',
                    'Module-3',
                    'Module-4',
                    'Module-5',
                    'Module-6',
                    'Module-7',
                    'Module-8',
                    'Module-9',
                    'Module-10',
                    'Module-11',
                    'Module-12',
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Number of employees'
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Registered',
                data: [83, 71, 106, 129, 144, 176, 135, 148, 216, 194, 95, 102]

            }, {
                name: 'Actual Attended',
                data: [49, 71, 98, 93, 106, 84, 105, 104, 91, 83, 106, 92]

            }]
        }

        const options_stacked_chart = {
            chart: {
                type: 'column',
                options3d: {
                    enabled: true,
                    alpha: 15,
                    beta: 15,
                    depth: 50,
                    viewDistance: 25
                }
            },
            title: {
                text: 'Assesment Attendence'
            },
            xAxis: {
                categories: [
                    'Module-1',
                    'Module-2',
                    'Module-3',
                    'Module-4',
                    'Module-5',
                    'Module-6',
                    'Module-7',
                    'Module-8',
                    'Module-9',
                    'Module-10',
                    'Module-11',
                    'Module-12',
                ],
                crosshair: true,
                labels: {
                    skew3d: true,
                    style: {
                        fontSize: '16px'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Number of Employees',
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: ( // theme
                            Highcharts.defaultOptions.title.style &&
                            Highcharts.defaultOptions.title.style.color
                        ) || 'gray'
                    }
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            series: [{
                name: 'Grade A',
                data: [83, 71, 106, 129, 144, 176, 135, 148, 216, 194, 95, 102]

            }, {
                name: 'Grade B',
                data: [49, 71, 98, 93, 106, 84, 105, 104, 91, 83, 106, 92]

            }, {
                name: 'Grade C',
                data: [49, 71, 98, 93, 106, 84, 105, 104, 91, 83, 106, 92]
            }]
        }


        const options_3 = {
            chart: {
                type: 'column',
                options3d: {
                    enabled: true,
                    alpha: 15,
                    beta: 15,
                    depth: 50,
                    viewDistance: 25
                }
            },
            title: {
                text: 'Development Plan Status'
            },
            xAxis: {
                categories: [
                    'Module-1',
                    'Module-2',
                    'Module-3',
                    'Module-4',
                    'Module-5',
                    'Module-6',
                    'Module-7',
                    'Module-8',
                    'Module-9',
                    'Module-10',
                    'Module-11',
                    'Module-12',
                ],
                crosshair: true,
                labels: {
                    skew3d: true,
                    style: {
                        fontSize: '16px'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Number of Employees',
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: ( // theme
                            Highcharts.defaultOptions.title.style &&
                            Highcharts.defaultOptions.title.style.color
                        ) || 'gray'
                    }
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            series: [{
                name: 'Completed',
                data: [83, 71, 106, 129, 144, 176, 135, 148, 216, 194, 95, 102]

            }, {
                name: 'Pending',
                data: [49, 71, 98, 93, 106, 84, 105, 104, 91, 83, 106, 92]

            }, {
                name: 'Not Started',
                data: [49, 34, 98, 68, 69, 65, 105, 73, 91, 83, 48, 42]
            }]
        }

        const options_4 =  {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            title: {
                text: 'Monthly Detail'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }
            },
            series: [{
                type: 'pie',
                data: [
                    ['Live Webinars', 45.0],
                    ['Live Sessions', 26.8],
                    
                    ['Documents', 8.5],
                    ['Video Contents', 6.2],
                    ['Assesments', 0.7]
                    ['Others', 0.7]
                ]
            }]
        }

        return (
            <div>
                <div>
                    <h3>Training Details</h3>

                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                        immutable={false}
                    />

                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options_stacked_chart}

                    />


                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options_3}

                    />

                    <h3>Monthly Training Detail</h3>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options_4}

                    />
                </div>

            </div>
        );
    }
}