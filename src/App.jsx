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

// ? find all caps font
// ! put in template
// ! move dropdown to middle or left
// ! make sure numbers fit in bar well

function App() {
  const [fileID, setFileID] = useState(initialFileID);

  const { title, url } = dataFiles.find(({ id }) => id === fileID);

  const csvText = useResponseText(url);

  const chartsData = useMemo(() => getChartsData(csvText), [csvText]);

  const dropdownItems = useMemo(() => updateDropdownItems(fileID), [fileID]);

  const onDropdownItemClick = useCallback((id) => setFileID(id), []);

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
          <div className="container bd-example-row small">
            <div className="row row-cols-1 row-cols-lg-2">
              {chartsData.map(({ title, data, id }) => {
                const { numberType } = dataTypes[id];

                const valueFormatters = {
                  rate: (value) =>
                    value.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      style: "percent",
                    }),
                  whole: (value) => value.toLocaleString(),
                };

                const [valueFormatter, xAxisDataKey, barDataKey] = [
                  valueFormatters[numberType],
                  dataKeys.xAxis,
                  dataKeys.bar,
                ];

                return (
                  <div className="col" key={id}>
                    <h5 className="text-uppercase fw-bold">{title}</h5>
                    <Chart
                      barLabel={{
                        formatter: valueFormatter,
                        position: "insideTop",
                        fill: "white",
                      }}
                      valueFormatter={valueFormatter}
                      xAxisDataKey={xAxisDataKey}
                      barDataKey={barDataKey}
                      data={data}
                    ></Chart>
                  </div>
                );
              })}
            </div>
          </div>
        </Section>
      </MainContainer>
    </>
  );
}

const Chart = ({
  barFill = "#8884d8",
  valueFormatter,
  xAxisDataKey,
  height = 300,
  barDataKey,
  barLabel,
  data,
}) => {
  const [mouseOverPayload, setMouseOverPayload] = useState({});

  const onMouseOverBar = useCallback(
    ({ payload }) => setMouseOverPayload(payload),
    []
  );

  const onMouseOutBar = useCallback(() => setMouseOverPayload({}), []);

  const topLabelValueAccessor = useCallback(
    ({ [xAxisDataKey]: xAxisValue, payload }) => {
      if (mouseOverPayload === payload) {
        return xAxisValue;
      }
    },
    [xAxisDataKey, mouseOverPayload]
  );

  return (
    <ResponsiveContainer height={height}>
      <BarChart data={data}>
        <XAxis dataKey={xAxisDataKey} />
        <YAxis tickFormatter={valueFormatter} />
        <Tooltip formatter={valueFormatter} />
        <Bar
          onMouseOver={onMouseOverBar}
          onMouseOut={onMouseOutBar}
          dataKey={barDataKey}
          label={barLabel}
          fill={barFill}
        >
          <LabelList valueAccessor={topLabelValueAccessor} position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default App;
