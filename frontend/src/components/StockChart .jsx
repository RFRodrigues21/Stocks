import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";


const StockChart  = ({details}) => {

  
  const seriesStockData = details?.prices
  ?.sort((a, b) => new Date(a.date) - new Date(b.date))
  .map((price) => ({
    x: new Date(price.date).getTime(),
    y: parseFloat(price.close), 
  }));

  const seriesVolumeData = details?.prices
  ?.sort((a, b) => new Date(a.date) - new Date(b.date))
  .map((price) => ({
    x: new Date(price.date).getTime(),
    y: parseFloat(price.volume),
  }));

  // Chart configuration
  const options = {
    title: {
      text: `${details.securityName}`,
    },
    xAxis: {
      type: "datetime",
      title: {
        text: "Date",
      },
    },
    yAxis: [
      {
        title: {
          text: "Stocks",
        },
        opposite: false,
      },
      {
        title: {
          text: "Volume",
        },
        opposite: true,
      },
    ],
    series: [
      {
        name: `Stocks`,
        data: seriesStockData,
        type: "line",
        color: '#1CA9F4',
        tooltip: {
          valueDecimals: 2,
        },
        yAxis: 0,
      },
      {
        name: ` Volume`,
        data: seriesVolumeData,
        color: '#F71616',
        type: "line",
        tooltip: {
          valueDecimals: 0,
        },
        yAxis: 1,
        
      },
    ],
    tooltip: {
      shared: true,
      crosshairs: true,
      dateTimeLabelFormats: {
        day: "%e %b, %Y",
      },
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options}  />;
};

export default StockChart ;
