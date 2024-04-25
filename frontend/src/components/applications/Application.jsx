// Application.jsx
import React from "react";
import ApplicationCardItem from "./ApplicationCardItem";
import "./Application.css";

const applicationData = [
  {
    id: 1,
    address: "123 Fake Street, Clayton, Victoria",
    leaseStart: "4 Feb 2025",
    rent: "1200",
    leaseDuration: "12",
  },
  {
    id: 2,
    address: "123 Fake Street, Clayton, Victoria",
    leaseStart: "4 Feb 2025",
    rent: "1200",
    leaseDuration: "12",
  },
  {
    id: 3,
    address: "123 Fake Street, Clayton, Victoria",
    leaseStart: "4 Feb 2025",
    rent: "1200",
    leaseDuration: "12",
  },
];

const Application = () => {
  return (
    <div className="application-list">
      {applicationData.map((app, index) => (
        <ApplicationCardItem
          key={index}
          address={app.address}
          leaseStart={app.leaseStart}
          rent={app.rent}
          leaseDuration={app.leaseDuration}
        />
      ))}
    </div>
  );
};
export default Application;
