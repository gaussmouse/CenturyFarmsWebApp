import { VictoryBar, VictoryLegend, VictoryLine, VictoryChart, VictoryAxis, VictoryLabel } from 'victory';
import { hPrecipitation } from "../historicPrecipitationData";
import { historicMaxTemp } from "../historicMaxTempData";
import { historicMinTemp } from "../historicMinTemp";
import { useParams } from "react-router-dom";

let farmID = "";

const FarmDetails = () => {
  farmID = useParams();
  farmID = farmID.id;
}

const HistoricClimateGraphs = () => {
    FarmDetails();
    const labels = ["1920", "1921", "1922", "1923", "1924", "1925", "1926", "1927", "1928", "1929", "1930", "1931", "1932", "1933", "1934", "1935", "1936", "1937", 
    "1938", "1939", "1940", "1941", "1942", "1943", "1944", "1945", "1946", "1947", "1948", "1949", "1950", "1951", "1952", "1953", "1954", "1955", 
    "1956", "1957", "1958", "1959", "1960", "1961", "1962", "1963", "1964", "1965", "1966", "1967", "1968", "1969", "1970", "1971", "1972", "1973",
    "1974", "1975", "1976", "1978", "1979", "1980", "1981", "1982", "1983", "1984", "1985", "1986", "1987", "1988", "1989", "1990", "1991", "1992",
    "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", 
    "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"];
    const celsiusMaxTemps = Object.values(historicMaxTemp[farmID-1]);
    const fahrenheitMaxTemps = celsiusMaxTemps.map(temp => (temp * 9/5) + 32);
  
    const celsiusMinTemps = Object.values(historicMinTemp[farmID-1]);
    const fahrenheitMinTemps = celsiusMinTemps.map(temp => (temp * 9/5) + 32);
    return (
      <div>
        <VictoryChart 
          maxDomain={{ y: 2300, x: 101}} 
          minDomain={{ y: 500 }}
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
            tickCount={21}
            style={{
              axisLabel: {padding: 25, fontSize: 8},
              tickLabels: {padding: 5, angle: -45, textAnchor: 'end', fontSize: 5},
              ticks: {stroke: "grey", size: 5}
              }}
            tickValues={labels}
            />
          <VictoryAxis dependentAxis
            label="Precipitation (mm)"
            tickCount={8}
            offsetX={49.3}
            style={{
              grid: { stroke: "#e0e0e0", strokeWidth: 1 },
              axisLabel: {padding: 25, fontSize: 8},
              tickLabels: {padding: 5, textAnchor: 'end', fontSize: 5},
              ticks: {stroke: "grey", size: 5}
              }}
            />
          <VictoryBar width={50} style={{data: {fill: "#66ccff"}}} data={[Object.values(hPrecipitation[farmID-1])[0], ...Object.values(hPrecipitation[farmID-1])]} />
        </VictoryChart>
   
        <VictoryChart 
          maxDomain={{ y: 75, x: 101}} 
          minDomain={{ y: 25, x: 0}} 
          height={150} width={340}
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
            tickCount={21}
            style={{
              grid: { stroke: "#e0e0e0", strokeWidth: 1 },
              axisLabel: {padding: 25, fontSize: 8},
              tickLabels: {padding: 5, angle: -45, textAnchor: 'end', fontSize: 5},
              ticks: {stroke: "grey", size: 3}
              }}
            tickValues={labels}
            />
          <VictoryAxis dependentAxis
            label="Temperature (F)"
            tickCount={10}
            style={{
              grid: { stroke: "#e0e0e0", strokeWidth: 1 },
              axisLabel: {padding: 25, fontSize: 8},
              tickLabels: {padding: 5, textAnchor: 'end', fontSize: 5},
              ticks: {stroke: "grey", size: 3}
              }}
            />
        </VictoryChart> 
  
      </div>
    )
  }

export default HistoricClimateGraphs;