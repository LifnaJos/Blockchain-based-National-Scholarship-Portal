import React, { useState } from "react";

function TableComponent({ tableData }) {
    if (!tableData || !Array.isArray(tableData)) {
      return <div>No data available</div>;
    }
  
    return (
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr
                key={`row-${rowIndex}`}
                style={{
                  backgroundColor: rowIndex === 0 ? "#007bff" : "transparent",
                  color: rowIndex === 0 ? "white" : "black",
                }}
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={`cell-${rowIndex}-${cellIndex}`}
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  

function ExpandableCard({ title, tableData }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="expandable-card">
      <div className="card-header" onClick={() => setIsExpanded(!isExpanded)}>
        {title}
        <span className="expand-symbol">{isExpanded ? "-" : "+"}</span>
      </div>
      {isExpanded && (
        <div className="card-body">
          <TableComponent tableData={tableData} /> 
        </div>
      )}
    </div>
  );
}

export default ExpandableCard;
