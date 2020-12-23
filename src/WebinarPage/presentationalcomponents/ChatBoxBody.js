import React, { Component } from 'react'
import { Image, Row, Col } from 'react-bootstrap'

import { formatDateFunction, formatdatefunction} from '../../HelperFunctions/formatDateFunction'

import UserImg from '../../images/mentor_dashboard_page/avatardp.png'
import { MEDIA_URL_TEXT } from '../../GlobalConstants';


export default class ChatBoxBody extends Component {

    constructor(props) {
        super(props);

        this.state = { msgdivlist: [] };
        this.updatediv = this.updatediv.bind(this);
        this.startpointer = 0;
        this.scrollToBottom =  this.scrollToBottom.bind(this);
        this.transformText = this.transformText.bind(this);
    }

    scrollToBottom = () => {
        if (!this.messagesEnd) {
            return;
        }

        // this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        if(this.messagesEnd.scrollIntoViewIfNeeded)
            this.messagesEnd.scrollIntoViewIfNeeded(false);
    }

    componentDidMount() {
        if (this.props.message){
            this.createMessageDiv(this.props.message, 0, this.props.profileFields)
        }

        this.scrollToBottom();
    }

    componentWillUnmount(){
        // console.log("ChatBoxBody componentWillUnmount :: called");
        this.state.msgdivlist= [];
    }
    
    componentWillReceiveProps(nextProps) {
        // console.log("componentWillReceiveProps::", nextProps.message);
        if (this.props.message === undefined && nextProps.message !== undefined && nextProps.message.length > 0) {
            // console.log("createMessageDiv::1",nextProps)
            this.createMessageDiv(nextProps.message, 0, nextProps.profileFields)
        } else if (this.props.message && (this.props.message.length < nextProps.message.length)) {
            //console.log("createMessageDiv::2")
            this.createMessageDiv(nextProps.message, this.startpointer,  nextProps.profileFields)
        } else if (this.props.message && (this.props.message.length > nextProps.message.length)) {
            //console.log("createMessageDiv::3")
            this.createMessageDiv(nextProps.message, 0, nextProps.profileFields)

        }
    }

    updatediv(divlist) {
        if (!Array.isArray(divlist)) {
            return;
        }
        this.setState({ msgdivlist: this.state.msgdivlist.concat(divlist) },  this.scrollToBottom);

    }

    transformText(text) {
        let newText = null
        const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g
        
        if(urlRegex.test(text)) {
            newText = text.replace(urlRegex, function(url, b, c) {
                // console.log('urlRegex :: ', {b, c})
                let url2 = (c == 'www.') ?  'http://' + url : url;
                url = url.length > 50 ? url.substr(0, 50) + '...' : url
                return '<b><a href="' +url2+ '" target="_blank">' + url + '</a></b>';
            }) 

            return <span dangerouslySetInnerHTML={{__html: newText}}></span>;
        }
        
        return text
    }

    createMessageDiv(messagelist, start, profileFields) {
        if(!messagelist){return}
        let end = messagelist.length;
        this.startpointer = end
        // console.log("createMessageDiv::", start,end ,messagelist,this.startpointer)

        let templist = []
        for (let i = start; i < end; i++) {
            let date
            if (messagelist[i].timestamp) {
                date = messagelist[i].timestamp
                // console.log("chat date ::", formatdatefunction( date,"time"))
            } else {
                date = new Date()
            }
            // console.log("inserting element, ", messagelist[i], profileFields)
            templist.push (
                <Row key={i} style={{ margin: "0px", marginTop: '10px' }} 
                    className={i === end - 1 ? "incoming-chat" : null}>
                    {messagelist[i].senderId === profileFields.pk ?
                        <div style={{ float: "right", display: 'flex', flexDirection: 'row-reverse' }} >
                            <div style={{background: '#F89212', height: '20px'}}>
                                <Image src={messagelist[i].profile_photo ?
                                    (MEDIA_URL_TEXT + messagelist[i].profile_photo) : UserImg}
                                    circle style={{ height: "20px", width: "20px" }} />
                            </div>
                            <div>
                                <span
                                    className="custom-list-content"
                                    style={{ padding: "0 10px 0 5px", fontWeight: "600", float: 'right', 
                                        background: '#F89212', color: '#fafafa' }}>
                                    You
                                </span>
                                {date ?
                                    <span
                                        className="custom-list-sub-content"
                                        style={{
                                            textAlign: "right",
                                            fontSize: "0.75em",
                                            float: 'right',
                                            paddingTop: '3px',
                                            marginRight: '5px',
                                            marginLeft: '10px'
                                        }}>{formatdatefunction(date, "time")}
                                    </span> : null
                                }
                                <span
                                    className="custom-list-sub-content"
                                    style={{
                                        overflowWrap: "break-word",
                                        wordBreak:" break-word", 
                                        letterSpacing: "0.01em",
                                        fontSize: "1em"
                                    }}>{this.transformText(messagelist[i].text)}</span>
                            </div>
                        </div>
                        :
                        messagelist[i].usertype === 'presenter' ?
                            <div style={{ float: "left", display: 'flex', flexDirection: 'row' }} >
                                <div style={{background: '#03a9f4', height: '20px'}}>
                                    <Image src={messagelist[i].profile_photo ?
                                        (MEDIA_URL_TEXT + messagelist[i].profile_photo):UserImg}
                                        circle style={{ height: "20px", width: "20px" }} />
                                </div>
                                <div>
                                    <span
                                        className="custom-list-content"
                                        style={{ padding: "3px 10px 2px 5px", fontWeight: "600", 
                                            background: '#03a9f4', color: '#fafafa' }}>
                                        {messagelist[i].senderName}
                                    </span>
                                    {date ?
                                        <span
                                            className="custom-list-sub-content"
                                            style={{
                                                marginLeft: "5px",
                                                marginRight: "10px",
                                                textAlign: "left",
                                                fontSize: "0.75em"
                                            }}>{formatdatefunction(date, "time")}
                                        </span> : null
                                    }
                                    <span
                                        className="custom-list-sub-content"
                                        style={{
                                            overflowWrap: "break-word",
                                            wordBreak: "break-word", 
                                            letterSpacing: "0.01em",
                                            fontSize: "1em"
                                        }}>{this.transformText(messagelist[i].text)}</span>
                                </div>
                            </div>
                            :
                            <div style={{ float: "left", display: 'flex', flexDirection: 'row' }} >
                                <div>
                                    <Image src={messagelist[i].profile_photo ?
                                        (MEDIA_URL_TEXT + messagelist[i].profile_photo):UserImg}
                                        circle style={{ height: "20px", width: "20px" }} />
                                </div>
                                <div>
                                    <span
                                        className="custom-list-content"
                                        style={{ padding: "0 10px", fontWeight: "600" }}>
                                        {messagelist[i].senderName}
                                    </span>
                                    {date ?
                                        <span
                                            className="custom-list-sub-content"
                                            style={{
                                                marginRight: "10px",
                                                textAlign: "left",
                                                fontSize: "0.75em"
                                            }}>{formatdatefunction(date, "time")}
                                        </span> : null
                                    }
                                    <span
                                        className="custom-list-sub-content"
                                        style={{
                                            overflowWrap: "break-word",
                                            wordBreak: "break-word", 
                                            letterSpacing: "0.01em",
                                            fontSize: "1em"
                                        }}>{this.transformText(messagelist[i].text)}</span>
                                </div>
                            </div>
                    }
                </Row>
            )
        }
        
        this.updatediv(templist);
    }


    render() {
        let isSmallScreen = "yes" === this.props.isSmallScreen
        let height = isSmallScreen ? "30vh" :"60vh"


        return (
            <div style={this.props.fromConference ? 
                {
                    padding: "0px 10px", 
                    overflowY: "scroll", 
                    overflowX: "hidden", 
                    width: "100.5%",
                    minHeight: height, 
                    maxHeight: height, 
                } :
                { 
                    "padding": "0px 10px", 
                    minHeight: height, 
                    maxHeight: height, 
                    overflowY: "scroll", 
                    overflowX: "hidden", 
                    "width": "100.5%" 
                }}>
                {this.state.msgdivlist}
                <div style={{ float: "left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </div>
        )
    }
}
