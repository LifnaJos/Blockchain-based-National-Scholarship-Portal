import React, { useState } from "react";
import ExpandableCard from "./ScholarshipExpandableTable";
import ScholarshipTableData from "./ScholarshipTableData";
import "./Home.css";

function ScholarshipTableComponent() {
  const [activeTab, setActiveTab] = useState(1);

  const getCardsForTab = (tabIndex) => {
    return Object.entries(ScholarshipTableData)
      .filter(([key, _]) => key.startsWith(`tab${tabIndex}`))
      .map(([_, cardData], index) => (
        <ExpandableCard
          key={index}
          title={cardData.title}
          tableData={cardData.table}
        />
      ));
  };

  return (
    <div className="App">
    <div>
      <div className="tab-header">
        <button
          className={activeTab === 1 ? "active" : ""}
          onClick={() => setActiveTab(1)}
        >
          Central Scheme
        </button>
        <button
          className={activeTab === 2 ? "active" : ""}
          onClick={() => setActiveTab(2)}
        >
          UGC/AICTE Schemes
        </button>
        <button
          className={activeTab === 3 ? "active" : ""}
          onClick={() => setActiveTab(3)}
        >
          State Schemes
        </button>
        <button
          className={activeTab === 4 ? "active" : ""}
          onClick={() => setActiveTab(4)}
        >
          Private Schemes
        </button>
      </div>
      <div className="tab-content">{getCardsForTab(activeTab)}</div>
    </div>
    </div>
  );
}

export default ScholarshipTableComponent;