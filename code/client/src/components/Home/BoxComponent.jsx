import React from "react";
import cardData from "./BoxComponentData";
import "./Home.css";
import { Link } from "react-router-dom";

function BoxComponentCard({ title, accordions }) {
  return (
    <div className="card" style={{ borderRadius: "0px" }}>
      <div className="card-header bg-primary text-white text-center font-weight-bold" style={{ borderRadius: "0px", padding: "5px" }}>
        {title}
      </div>
      <div className="card-body" style={{ height: "200px", padding: "0px"}}>
        {accordions.map((accordion, index) => (
          <div key={index} className="accordion-item">
            <div style={{padding: "5px", borderBottom: "1px solid black"}}>
            <Link style={{ textDecoration: "none", color: "black" }} 
            to={accordion.to}>
            <ul style={{margin: "0px", fontSize: "15px"}}><li>{accordion.content}</li></ul>
            </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BoxComponent() {
  return (
    <div className="box-component-container" style={{ backgroundColor: "#1f657c", padding: "20px 0px" }}>
      <div className="container-fluid">
        <div className="row">
          {cardData.map((card, index) => (
            <div key={index} className="col-xl col-lg-3 col-md-6 col-sm-6 mb-3">
              <BoxComponentCard title={card.title} accordions={card.accordions} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BoxComponent;
