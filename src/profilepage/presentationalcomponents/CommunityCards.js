import React from 'react';

const CommunityCards = props => {
	return (
		      <div className=" generic-post-card ax_default refier_text_on_light_10" data-label="Community Cards">
            <div className="" style={{"textAlign":"left"}}>
              <span style={{"float":"right"}}>{props.card}</span><br/>
              <hr/>
              <div className="ax_default refier_text_on_light__8">
              {props.school}<br/><br/>
              {props.college}
              </div>
            </div>
          </div>
		);
};

export default CommunityCards;