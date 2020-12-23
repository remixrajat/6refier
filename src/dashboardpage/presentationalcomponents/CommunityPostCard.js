import React from 'react';

const CommunityPostCard = props => {
  return (
    <div
      className="ax_default generic-post-card community-post-card"
      data-label="community post Card Elements"
    >
      {/*Question (Rectangle)*/}
      <div
        className="ax_default refier_text_on_light_1 text"
        data-label="Question"
      >
        {props.question}
      </div>

      {/*<!-- Unnamed (Rectangle) -->*/}
      <div className="ax_default refier_custom_text_on_light_h5 text">
        {props.time}
      </div>

      {/*<!-- Unnamed (Rectangle) -->*/}
      <div className="ax_default refier_custom_text_on_light_h4 text">
        {props.organization}
      </div>
    </div>
  );
};

export default CommunityPostCard;
