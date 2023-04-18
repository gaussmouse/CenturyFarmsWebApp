import { VictoryBar, VictoryLegend, VictoryLine, VictoryChart, VictoryAxis, VictoryLabel } from 'victory';
import { futureMaxTemp } from "../futureMaxTempData";
import { futureMinTemp } from "../futureMinTempData";
import { futurePrecipitation } from "../futurePrecipitationData";
import { useParams } from "react-router-dom";

let farmID = "";

const FarmDetails = () => {
  farmID = useParams();
  farmID = farmID.id;
}

const FutureClimateGraphs = () => {
    FarmDetails();
    const futureLabels = ["2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034", "2035", "2036",
    "2037", "2038", "2039", "2040", "2041", "2042", "2043", "2044", "2045", "2046", "2047", "2048", "2049", "2050"];
    //const fLabels = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042,
    //2043, 2044, 2045, 2046, 2047, 2048, 2049, 2050];
    const celsiusMaxTemps = Object.values(futureMaxTemp[farmID-1]);
    const fahrenheitMaxTemps = celsiusMaxTemps.map(temp => (temp * 9/5) + 32);
  
    const celsiusMinTemps = Object.values(futureMinTemp[farmID-1]);
    const fahrenheitMinTemps = celsiusMinTemps.map(temp => (temp * 9/5) + 32);
    return (
      <div>
        <VictoryChart
         maxDomain={{ y: 1700, x: 29}}
         minDomain={{ y: 950}}
         height={150} 
         width={340}
         style={{ 
          parent: { 
            maxWidth: 1200,
            maxHeight: 500, 
            minWidth: 250, 
            minHeight: 100, 
          } 
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
              axisLabel: {padding: 25, fontSize: 8},
              tickLabels: {padding: 5, angle: -45, textAnchor: 'end', fontSize: 5},
              ticks: {stroke: "grey", size: 5}
              }}
            tickValues={futureLabels}
            />
          <VictoryAxis dependentAxis
            label="Precipitation (mm)"
            tickCount={10}
            offsetX={48}
            style={{
              grid: { stroke: "#e0e0e0", strokeWidth: 1 },
              axisLabel: {padding: 25, fontSize: 8},
              tickLabels: {padding: 5, textAnchor: 'end', fontSize: 5},
              ticks: {stroke: "grey", size: 5}
              }}
            />
          <VictoryBar width={50} style={{data: {fill: "#66ccff"}}} data={[Object.values(futurePrecipitation[farmID-1])[0], ...Object.values(futurePrecipitation[farmID-1])]} />
        </VictoryChart>
   
        <VictoryChart 
          maxDomain={{ y: 75, x: 29}} 
          minDomain={{ y: 35, x: 0}} 
          height={150} 
          width={340}
          style={{ 
          parent: { 
            maxWidth: 1200,
            maxHeight: 500, 
            minWidth: 250, 
            minHeight: 100, 
          } 
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
            style={{data: {stroke: "red", strokeWidth: 0.25}}}
            />
          <VictoryLine 
            data={[fahrenheitMinTemps[0], ...fahrenheitMinTemps]}
            style={{data: {stroke: "blue", strokeWidth: 0.25}}}
            />
           <VictoryLegend x={295} y={50}
              orientation="vertical"
              gutter={10}
              title="Key"
              style={{ 
                border: { stroke: "black" }, 
                title: {fontSize: 4},
                labels: {fontSize: 3 }
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
              axisLabel: {padding: 25, fontSize: 8},
              tickLabels: {padding: 5, angle: -45, textAnchor: 'end', fontSize: 5},
              ticks: {stroke: "grey", size: 3}
              }}
            tickValues={futureLabels}
            />
          <VictoryAxis dependentAxis
            label="Temperature (F)"
            tickCount={20}
            style={{
              grid: { stroke: "#e0e0e0", strokeWidth: 1 },
              axisLabel: {padding: 25, fontSize: 5},
              tickLabels: {padding: 5, textAnchor: 'end', fontSize: 5},
              ticks: {stroke: "grey", size: 3}
              }}
            />
        </VictoryChart> 
  
      </div>
    )
  }

export default FutureClimateGraphs;