import React, { useState, useEffect } from "react";
import { fetchSecurityDetails } from "../api/apiService";
import StockChart from "../components/StockChart ";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ComplexStatisticsCard from "../components/ComplexStatisticsCard";

const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  } else {
    return num.toString(); // Handle numbers less than 1000
  }
};

// Function to find extremes for a given property and their respective dates
const findExtremes = (prices, propName) => {
  if (!prices || prices.length === 0) {
    return {
      highest: { value: "N/A", date: "N/A" },
      lowest: { value: "N/A", date: "N/A" },
    };
  }

  let highest = {
    value: parseFloat(prices[0][propName]),
    date: prices[0].date,
  };
  let lowest = { value: parseFloat(prices[0][propName]), date: prices[0].date };

  prices.forEach((price) => {
    const value = parseFloat(price[propName]);
    if (value > highest.value) {
      highest = { value, date: price.date };
    }
    if (value < lowest.value) {
      lowest = { value, date: price.date };
    }
  });

  highest.value = formatNumber(highest.value);
  lowest.value = formatNumber(lowest.value);

  return { highest, lowest };
};

const SecurityDetails = () => {
  const { id } = useParams();
  const [security, setSecurityDeatils] = useState([]);
  const [error, setError] = useState(null);

  const { highest: highestClose, lowest: lowestClose } = findExtremes(
    security.prices,
    "close"
  );
  const { highest: highestVolume, lowest: lowestVolume } = findExtremes(
    security.prices,
    "volume"
  );

  useEffect(() => {
    const loadSecurities = async () => {
      try {
        const data = await fetchSecurityDetails(id);
        setSecurityDeatils(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadSecurities();
  }, [id]);

  return (
    <div className="m-10 p-4 ">
      <Breadcrumbs aria-label="breadcrumb" className="mb-4 dark:text-[#e9ecef]">
        <Link underline="hover" color="inherit" href="/">
          Securities List
        </Link>
        <Typography color="text.primary" className="dark:text-[#adb5bd]">
          Details
        </Typography>
      </Breadcrumbs>
      <div className="flex flex-1 flex-wrap gap-4 flex-col md:flex-row">
        <div className=" bg-white dark:bg-[#00406c] p-8 flex-col rounded-lg flex justify-between items-center">
          <div>
            <p>
              {security.ticker} - {security.securityName}
            </p>
          </div>
          <div className="mt-10">
            <p>Sector: {security.sector}</p>
            <p>Country: {security.country}</p>
          </div>
        </div>
        <ComplexStatisticsCard
          leftTitle="Highest Stock"
          leftValue={highestClose.value}
          leftDescription={highestClose.date}
          rightTitle="Lowest Stock"
          rightValue={lowestClose.value}
          rightDescription={lowestClose.date}
        />
        <ComplexStatisticsCard
          leftTitle="Highest Volume"
          leftValue={highestVolume.value}
          leftDescription={highestVolume.date}
          rightTitle="Lowest Volume"
          rightValue={lowestVolume.value}
          rightDescription={lowestVolume.date}
        />
      </div>

      <div className=" mt-10 w-full shadow">
        <StockChart details={security} />
      </div>
    </div>
  );
};

export default SecurityDetails;
