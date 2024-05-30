import {
  ResponsiveContainer,
  Rectangle,
  LabelList,
  BarChart,
  Tooltip,
  YAxis,
  XAxis,
  Bar,
} from "recharts";
import { useCallback, useState, useMemo } from "react";

import { updateDropdownItems } from "./js/updateDropdownItems";
import { MainContainer } from "./components/MainContainer";
import { useResponseText } from "./hooks/useResponseText";
import { NavDropdown } from "./components/NavDropdown";
import { getChartsData } from "./js/getChartsData";
import { initialFileID } from "./js/initialFileID";
import { BrandBar } from "./components/BrandBar";
import { EKULogo } from "./components/EKULogo";
import { Section } from "./components/Section";
import { dataFiles } from "./js/dataFiles";
import { dataTypes } from "./js/dataTypes";
import { dataKeys } from "./js/dataKeys";
import { Nav } from "./components/Nav";

function App() {
  const [fileID, setFileID] = useState(initialFileID);

  const { title, url } = dataFiles.find(({ id }) => id === fileID);

  const csvText = useResponseText(url);

  const chartsData = useMemo(() => getChartsData(csvText), [csvText]);

  const dropdownItems = useMemo(() => updateDropdownItems(fileID), [fileID]);

  const onDropdownItemClick = useCallback((id) => setFileID(id), []);

  console.log(chartsData);

  return (
    <>
      <MainContainer>
        <BrandBar>
          <EKULogo></EKULogo>
          <Nav>
            <NavDropdown
              onItemClick={onDropdownItemClick}
              items={dropdownItems}
            >
              {title}
            </NavDropdown>
          </Nav>
        </BrandBar>
        <Section>
          <div className="container bd-example-row">
            <div className="row row-cols-1 row-cols-lg-2">
              {chartsData.map(({ title, data, id }) => {
                const { numberType } = dataTypes[id];

                const valueFormatters = {
                  rate: (value) =>
                    value.toLocaleString(undefined, { style: "percent" }),
                  whole: (value) => value.toLocaleString(),
                };

                const [valueFormatter, xAxisDataKey, barDataKey] = [
                  valueFormatters[numberType],
                  dataKeys.xAxis,
                  dataKeys.bar,
                ];

                return (
                  <div className="col" key={id}>
                    <h2>{title}</h2>
                    <ResponsiveContainer height={300}>
                      <BarChart data={data}>
                        <XAxis dataKey={xAxisDataKey} />
                        <YAxis tickFormatter={valueFormatter} />
                        <Tooltip formatter={valueFormatter} />
                        <Bar dataKey={barDataKey} fill="seagreen">
                          <LabelList
                            formatter={valueFormatter}
                            dataKey={barDataKey}
                            position="insideTop"
                            fill="white"
                          />
                          <LabelList dataKey={xAxisDataKey} position="top" />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                );
              })}
            </div>
          </div>
          {/* <div className="d-flex flex-wrap bd-example-row">
            {chartsData.map(({ title, id }) => (
              <div className="col-6" key={id}>
                <h2 className="pb-2">{title}</h2>
                <Chart></Chart>
              </div>
            ))}
          </div> */}
        </Section>
      </MainContainer>
    </>
  );
}

const data = [
  {
    name: "Page A",
    amt: 2400,
    uv: 4000,
    pv: 2400,
  },
  {
    name: "Page B",
    amt: 2210,
    uv: 3000,
    pv: 1398,
  },
  {
    name: "Page C",
    amt: 2290,
    uv: 2000,
    pv: 9800,
  },
  {
    name: "Page D",
    amt: 2000,
    uv: 2780,
    pv: 3908,
  },
  {
    name: "Page E",
    amt: 2181,
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Page F",
    amt: 2500,
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Page G",
    amt: 2100,
    uv: 3490,
    pv: 4300,
  },
];

const Chart = ({ height = 300 }) => {
  return (
    <>
      <ResponsiveContainer height={height}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            activeBar={<Rectangle stroke="blue" fill="pink" />}
            fill="#8884d8"
            dataKey="pv"
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default App;
