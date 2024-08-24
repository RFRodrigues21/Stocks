import React from "react";

const ComplexStatisticsCard = ({
  leftTitle,
  leftValue,
  leftDescription,
  rightTitle,
  rightValue,
  rightDescription,
}) => {
  return (
    <div className=" bg-white dark:bg-[#00406c] p-8 rounded-lg flex flex-wrap flex-1 justify-between items-center overflow-hidden ">
      <div className="flex grow flex-col justify-between items-center  border-b md:border-b-0 md:border-r border-slate-600 min-w-44">
        <h3 className="text-sm">{leftTitle}</h3>
        <p className="text-5xl text-green-500">{leftValue}</p>
        <p className="truncate">{leftDescription}</p>
      </div>
      <div className="flex grow flex-col justify-between items-center">
        <h3 className="text-sm">{rightTitle}</h3>
        <p className="text-5xl text-red-500">{rightValue}</p>
        <p className="truncate">{rightDescription}</p>
      </div>
    </div>
  );
};

export default ComplexStatisticsCard;
