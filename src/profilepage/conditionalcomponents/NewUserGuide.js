import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { newUserExplainCompleted } from '../../shared/Header/conditionalcomponents/action';

import PreLoader from '../../shared/Preloader/PreLoader'


class NewUserGuide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sectionNum: 0,
        }
        this.newUserExplainCompleted = this.newUserExplainCompleted.bind(this);
        this.explain = this.explain.bind(this);
    }
    
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    componentWillUnmount() {
        this.props.dispatch({type: 'highlight', data: 'none'})
    }
    
    newUserExplainCompleted() {
        this.props.dispatch(newUserExplainCompleted());
        this.setState({sectionNum: this.state.sectionNum + 1})
    }

    explain(customStyle) {
        let section = [
            {
                name: 'AppSideBar',
                body: 
                    <div style={customStyle} className="user-explain-panel" id="refier__hint_panel">
                        <span className="user-explain-panel-arrow" style={{top: "75px", right: "-10px"}}></span>
                        <p className="user-explain-info">
                            Our sidebar lists our topics, mentors and communities for you to explore
                        </p>
                        <Button 
                            style={{marginTop: "10px"}}
                            className="refier_custom_button_save" 
                            onClick={(e) => this.setState({sectionNum: this.state.sectionNum + 1})}>Click Me!</Button>
                    </div>
            },
            {
                name: 'Calendar',
                body: 
                    <div style={customStyle} className="user-explain-panel" id="refier__hint_panel">
                        <span className="user-explain-panel-arrow" style={{bottom: "-10px", left: "90px"}}></span>
                        <p className="user-explain-info">
                            Our Calendar keeps track of important dates for you. So, be sure to check for upcoming events
                        </p>
                        <Button
                            style={{marginTop: "10px"}}
                            className="refier_custom_button_save" 
                            onClick={(e) => 
                                this.setState({sectionNum: this.state.sectionNum + 1}, 
                                () => {
                                    if(this.props.recommendation_section)
                                        window.scrollTo(0, this.props.filter_nav.top + 250)
                                    else window.scrollTo(0, this.props.filter_nav.top + 60)
                                })
                            }>Click Me!</Button>
                    </div>
            },
            {
                name: 'Feeds',
                body: 
                    <div style={customStyle} className="user-explain-panel" id="refier__hint_panel">
                        <span className="user-explain-panel-arrow" style={{left: "-10px", top: "75px"}}></span>
                        <p className="user-explain-info">
                            This is your FEED. All blogs and questions from your communities will be here.
                        </p>
                        <Button
                            style={{marginTop: "10px"}}
                            className="refier_custom_button_save" 
                            onClick={() => {
                                if(this.props.recommendation_section) {
                                    this.setState(
                                        {sectionNum: this.state.sectionNum + 1}, 
                                        () => window.scrollTo(0, this.props.recommendation_section.top))
                                } else {
                                    this.newUserExplainCompleted()
                                }
                            }}>
                            {
                                this.props.recommendation_section ? 
                                    'Click Me!' :
                                    'Finish!'
                            }
                        </Button>
                    </div>
            },
            // {
            //     name: 'Services',
            //     body: 
            //         <div style={customStyle} className="user-explain-panel">
            //             <span className="user-explain-panel-arrow" style={{right: "-10px", top: "75px"}}></span>
            //             <p className="user-explain-info">
            //                 Everything Refier provides you with is in Services Tab  
            //             </p>
            //             <Button
            //                 style={{marginTop: "10px"}}
            //                 className="refier_custom_button_save" 
            //                 onClick={() => this.newUserExplainCompleted()}>Finish!</Button>
            //         </div>
            // },
            {
                name: 'Recommendation',
                body: 
                    <div style={customStyle} className="user-explain-panel" id="refier__hint_panel">
                        <span className="user-explain-panel-arrow" style={{left: "-10px", top: "60px"}}></span>
                        <p className="user-explain-info">
                            Refier recommendations for you to explore  
                        </p>
                        <Button
                            style={{marginTop: "10px"}}
                            className="refier_custom_button_save" 
                            onClick={() => this.newUserExplainCompleted()}>Finish!</Button>
                    </div>
            },
            {
                name: 'Loader',
                body: 
                    <div style={{top: "45%", left: "45%"}} className="user-explain-panel">
                        <PreLoader />
                    </div>
            },
        ]

        return section[this.state.sectionNum] ? section[this.state.sectionNum].body : null;
    }

    render() {
        // console.log("NewUserGuide::", this.props, this.state)
        
        let customStyle = {};

        if(this.state.sectionNum === 0 && this.props.app_sidebar) {
            this.props.dispatch({type: 'highlight', data: 'app_sidebar'})
            customStyle = {
                top: this.props.app_sidebar.top + 30,
                left: this.props.app_sidebar.left - 275,
            }
        }
        else if(this.state.sectionNum === 1 && this.props.calendar) {
            this.props.dispatch({type: 'highlight', data: 'calendar'})
            customStyle = {
                top: this.props.calendar.top - 220,
                left: this.props.calendar.left,
            }
        }
        else if(this.state.sectionNum === 2 && this.props.filter_nav) {
            this.props.dispatch({type: 'highlight', data: 'filter_nav'})
            customStyle = {
                top: 200,
                left: this.props.filter_nav.right + 60,
            }
        }
        else if(this.state.sectionNum === 3) {
            this.props.dispatch({type: 'highlight', data: 'recommendation_section'})
            customStyle = {
                top: this.props.recommendation_section.top + 100,
                left: this.props.recommendation_section.right + 60
            }
        }
        else {
            this.props.dispatch({type: 'highlight', data: 'none'})
        }

        return (
            <div className="user-explain-overlay">
                <div className="user-explain-skip-wrapper">
                    <Button
                        className="refier_custom_button_save" 
                        onClick={() => this.newUserExplainCompleted()}>End Tour</Button>
                </div>
                {this.explain(customStyle)}
            </div>
        )
    }

}

let mapStateToProps = (store) => {
    return {
        new_user_interest_form: store.stylesDataReducer.new_user_interest_form,
        app_sidebar: store.stylesDataReducer.app_sidebar,
        filter_nav: store.stylesDataReducer.filter_nav,
        calendar: store.stylesDataReducer.calendar,
        recommendation_section: store.stylesDataReducer.recommendation_section,
    }
};

export default connect(mapStateToProps)(NewUserGuide);