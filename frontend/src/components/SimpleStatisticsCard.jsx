import React from "react";

const SimpleStatisticsCard = ({ title, value, content }) => {
  return (
    <div className=" p-8 rounded-lg flex justify-between items-center bg-white dark:bg-[#00406c]">
      <div className="flex flex-col justify-between items-center">
        <h3 className="text-sm">{title}</h3>
        <p className="text-5xl">{value}</p>
      </div>
      {content}
    </div>
  );
};

export default SimpleStatisticsCard;
