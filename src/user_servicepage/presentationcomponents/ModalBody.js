import React from "react";

const ModalBody = ({data}) => {
    const renderList = (data) => {
        const rowProperties = Object.keys(data);
        return rowProperties.map( (item,i) => {
            return <li className="list-group-item" key={i}>
                <h5><span style={{ fontWeight: "bold" }}>{item.toUpperCase()}</span>: {data[item]}</h5>
                    </li>
        });
    }

    return(
        <ul className="list-group">
            {renderList(data)}
        </ul>
    );
}

export default ModalBody;
