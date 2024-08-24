import React, { useState, useEffect } from "react";
import DataTable from "../components/DataTable";
import { fetchSecurities } from "../api/apiService";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SimpleStatisticsCard from "../components/SimpleStatisticsCard";
import ComplexStatisticsCard from "../components/ComplexStatisticsCard";

// Function to calculate the average Trends
const calculateAverageTrend = (securities) => {
  if (!securities || securities.length === 0) {
    return 0;
  }

  const totalTrend = securities.reduce(
    (sum, security) => sum + security.trend,
    0
  );
  return (totalTrend / securities.length).toFixed(2);
};

// Function to calculate the country with the most stocks
const calculateTopCountryWithStocks = (securities) => {
  if (!securities || securities.length === 0) {
    return { country: "N/A", totalStocks: 0 }; // Return default if no data
  }

  const countryStockCounts = securities.reduce((counts, security) => {
    counts[security.country] = (counts[security.country] || 0) + 1;
    return counts;
  }, {});

  let topCountry = null;
  let maxStocks = 0;

  for (const [country, count] of Object.entries(countryStockCounts)) {
    if (count > maxStocks) {
      maxStocks = count;
      topCountry = country;
    }
  }

  return { country: topCountry, totalStocks: maxStocks };
};

// Function to calculate the company with the highest and lowest stock trend
const calculateTrendExtremes = (securities) => {
  if (!securities || securities.length === 0) {
    return {
      highestTrend: { company: "N/A", trend: 0 },
      lowestTrend: { company: "N/A", trend: 0 },
    };
  }

  let highestTrend = {
    company: null,
    trend: -Infinity, // Start with the lowest possible number for comparison
  };

  let lowestTrend = {
    company: null,
    trend: Infinity, // Start with the highest possible number for comparison
  };

  for (const security of securities) {
    const { securityName, trend } = security;

    // Check for highest trend
    if (trend > highestTrend.trend) {
      highestTrend = {
        company: securityName,
        trend,
      };
    }

    // Check for lowest trend
    if (trend < lowestTrend.trend) {
      lowestTrend = {
        company: securityName,
        trend,
      };
    }
  }

  return { highestTrend, lowestTrend };
};

const SecurityList = () => {
  const [securities, setSecurities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSecurities = async () => {
      try {
        const data = await fetchSecurities();
        setSecurities(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadSecurities();
  }, []);

  const averageTrend = calculateAverageTrend(securities);

  const { country: topCountry, totalStocks } =
    calculateTopCountryWithStocks(securities);

  const { highestTrend, lowestTrend } = calculateTrendExtremes(securities);

  return (
    <div className=" flex flex-col gap-4 p-8 ">
      <div className="flex flex-col gap-4 md:flex-row md:flex-wrap ">
        <SimpleStatisticsCard
          title="Average Trends"
          value={averageTrend}
          content={
            <ShowChartIcon
              fontSize="large"
              color={averageTrend >= 0 ? "success" : "error"}
            />
          }
        />
        <SimpleStatisticsCard
          title="Top Stock Country"
          value={totalStocks}
          content={<p>{topCountry}</p>}
        />
        <ComplexStatisticsCard
          leftTitle="Highest Stock Trend"
          leftValue={highestTrend.trend.toFixed(2)}
          leftDescription={highestTrend.company}
          rightTitle="Lowest Stock Trend"
          rightValue={lowestTrend.trend.toFixed(2)}
          rightDescription={lowestTrend.company}
        />
      </div>
      <div className="bg-white p-8 rounded-lg ">
        <DataTable securities={securities} />
      </div>
    </div>
  );
};

export default SecurityList;
