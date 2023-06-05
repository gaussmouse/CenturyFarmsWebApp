import { useRef, useEffect, useState } from "react";
import {
  VictoryBar,
  VictoryLegend,
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
} from "victory";
import { useParams } from "react-router-dom";
import NavBar from "./FarmsPageNav";
import "../stylesheets/farm-data.css";

const FutureClimateGraphs = () => {
  const { id } = useParams();
  const [futureMaxTemp, setFutureMaxTemp] = useState(null);
  const [futureMinTemp, setFutureMinTemp] = useState(null);
  const [futurePrecipitation, setFuturePrecipitation] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const maxTemp = await GetFutureMaxTemp(id);
      const minTemp = await GetFutureMinTemp(id);
      const precipitation = await GetFuturePercipitation(id);
      setFutureMaxTemp(maxTemp);
      setFutureMinTemp(minTemp);
      setFuturePrecipitation(precipitation);
    }
    fetchData();
  }, []);

  if (!futureMaxTemp || !futureMinTemp || !futurePrecipitation) {
    return null;
  }

  const futureLabels = [
    "2023",
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2030",
    "2031",
    "2032",
    "2033",
    "2034",
    "2035",
    "2036",
    "2037",
    "2038",
    "2039",
    "2040",
    "2041",
    "2042",
    "2043",
    "2044",
    "2045",
    "2046",
    "2047",
    "2048",
    "2049",
    "2050",
  ];
  const celsiusMaxTemps = Object.values(futureMaxTemp);
  const fahrenheitMaxTemps = celsiusMaxTemps.map((temp) => (temp * 9) / 5 + 32);

  const celsiusMinTemps = Object.values(futureMinTemp);
  const fahrenheitMinTemps = celsiusMinTemps.map((temp) => (temp * 9) / 5 + 32);

  return (
    <div>
      <NavBar />
      <div className="mobile-padding">
        <VictoryChart
          maxDomain={{ y: 1700, x: 28 }}
          minDomain={{ y: 950 }}
          height={150}
          width={340}
          style={{
            parent: {
              maxWidth: 1200,
              maxHeight: 500,
              minWidth: 250,
              minHeight: 100,
            },
          }}
        >
          <VictoryLabel
            text="Precipitation Over Time"
            x={170}
            y={30}
            textAnchor="middle"
            padding={0}
            style={{ fontSize: 10 }}
          />
          <VictoryAxis
            label="Year"
            tickCount={28}
            style={{
              axisLabel: { padding: 25, fontSize: 8 },
              tickLabels: {
                padding: 5,
                angle: -45,
                textAnchor: "end",
                fontSize: 5,
              },
              ticks: { stroke: "grey", size: 5 },
            }}
            tickValues={futureLabels}
          />
          <VictoryAxis
            dependentAxis
            label="Precipitation (mm)"
            tickCount={10}
            offsetX={48}
            style={{
              grid: { stroke: "#e0e0e0", strokeWidth: 1 },
              axisLabel: { padding: 25, fontSize: 8 },
              tickLabels: { padding: 5, textAnchor: "end", fontSize: 5 },
              ticks: { stroke: "grey", size: 5 },
            }}
          />
          <VictoryBar
            width={50}
            style={{ data: { fill: "#66ccff" } }}
            data={[
              Object.values(futurePrecipitation)[0],
              ...Object.values(futurePrecipitation),
            ]}
          />
        </VictoryChart>
      </div>

      <VictoryChart
        maxDomain={{ y: 75, x: 28 }}
        minDomain={{ y: 35, x: 0 }}
        height={150}
        width={340}
        style={{
          parent: {
            maxWidth: 1200,
            maxHeight: 500,
            minWidth: 250,
            minHeight: 100,
          },
        }}
      >
        <VictoryLabel
          text="Temperature Over Time"
          x={170}
          y={30}
          textAnchor="middle"
          padding={0}
          style={{ fontSize: 10 }}
        />
        <VictoryLine
          data={[fahrenheitMaxTemps[0], ...fahrenheitMaxTemps]}
          style={{ data: { stroke: "red", strokeWidth: 0.25 } }}
        />
        <VictoryLine
          data={[fahrenheitMinTemps[0], ...fahrenheitMinTemps]}
          style={{ data: { stroke: "blue", strokeWidth: 0.25 } }}
        />
        <VictoryLegend
          x={295}
          y={50}
          orientation="vertical"
          gutter={10}
          title="Key"
          style={{
            border: { stroke: "black" },
            title: { fontSize: 4 },
            labels: { fontSize: 3 },
          }}
          data={[
            { name: "Average Max \nTemperature", symbol: { fill: "red" } },
            { name: "Average Min \nTemperature", symbol: { fill: "blue" } },
          ]}
          centerTitle
        />
        <VictoryAxis
          label="Year"
          //tickCount={28}
          style={{
            grid: { stroke: "#e0e0e0", strokeWidth: 1 },
            axisLabel: { padding: 25, fontSize: 8 },
            tickLabels: {
              padding: 5,
              angle: -45,
              textAnchor: "end",
              fontSize: 5,
            },
            ticks: { stroke: "grey", size: 3 },
          }}
          tickValues={futureLabels}
        />
        <VictoryAxis
          dependentAxis
          label="Temperature (F)"
          tickCount={20}
          style={{
            grid: { stroke: "#e0e0e0", strokeWidth: 1 },
            axisLabel: { padding: 25, fontSize: 5 },
            tickLabels: { padding: 5, textAnchor: "end", fontSize: 5 },
            ticks: { stroke: "grey", size: 3 },
          }}
        />
      </VictoryChart>
    </div>
  );
};

async function GetFutureMaxTemp(id) {
  const response = await fetch(`/fmaxt/id/` + id);
  const records = await response.json();
  return records[0];
}

async function GetFutureMinTemp(id) {
  const response = await fetch(`/fmint/id/` + id);
  const records = await response.json();
  return records[0];
}

async function GetFuturePercipitation(id) {
  const response = await fetch(`/fpercipitation/id/` + id);
  const records = await response.json();
  return records[0];
}

export default FutureClimateGraphs;
