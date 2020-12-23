import React, {Component} from "react"
import { Grid } from "react-bootstrap";

import DocumentCard from "./DocumentCard";
import Preloader from '../../shared/Preloader/PreLoader'


class DocumentPage extends Component{
    constructor(props){
        super(props);
        this.createCards = this.createCards.bind(this);
    }

    createCards(content) {
        return(
            <DocumentCard 
                content={content.fields}
                contentId={content.pk}
                fromOtherPage={this.props.fromOtherPage}
                saveProgress={this.props.saveProgress}
                userCredits={this.props.userCredits}/>
        );
       
    }

   render() {
        // console.log("DocumentPage::", this.props);

        let contentInfoCard;
        if (this.props.contentDetails !== undefined){
            contentInfoCard=[]
            contentInfoCard = this.props.contentDetails.map(this.createCards);
        }
        
        return(
            <div>
                <Grid fluid>
                    {this.props.contentDetails?
                        contentInfoCard.length==0?
                            <div className="custom-list-content">
                                Sorry! No Documents are available ...</div>
                        :
                        contentInfoCard
                    :
                    <div style={{textAlign:"center"}}>
                    <Preloader loaderMessage="Loading Documents..."/>
                    </div>}
                </Grid>
            </div>
        );
    }
}


export default  DocumentPage;