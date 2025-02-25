import { useCallback, useState, Fragment, useMemo } from "react";

import { updateDropdownItems } from "./js/updateDropdownItems";
import { CustomBarChart } from "./components/CustomBarChart";
import { MainContainer } from "./components/MainContainer";
import { useResponseText } from "./hooks/useResponseText";
import { NavDropdown } from "./components/NavDropdown";
import { valueFormatters } from "./js/valueFormatters";
import { RowColsGrid } from "./components/RowColsGrid";
import { getChartsData } from "./js/getChartsData";
import { initialFileID } from "./js/initialFileID";
import { BrandBar } from "./components/BrandBar";
import { EKULogo } from "./components/EKULogo";
import { Section } from "./components/Section";
import { Wrapper } from "./components/Wrapper";
import { dataFiles } from "./js/dataFiles";
import { dataTypes } from "./js/dataTypes";
import { dataKeys } from "./js/dataKeys";
import { Nav } from "./components/Nav";

// ? find all caps font

// ! put in template
// ! move dropdown to middle or left
// ! fix tooltip oob

function App() {
  const [fileID, setFileID] = useState(initialFileID);

  const { title, url } = dataFiles.find(({ id }) => id === fileID);

  const csvText = useResponseText(url);

  const chartsData = useMemo(() => getChartsData(csvText), [csvText]);

  const dropdownItems = useMemo(() => updateDropdownItems(fileID), [fileID]);

  const onDropdownItemClick = useCallback((id) => setFileID(id), []);

  const { xAxis: xAxisDataKey, bar: barDataKey } = dataKeys;

  const rowCols = useMemo(
    () => [{ span: 1 }, { breakpoint: "lg", span: 2 }],
    []
  );

  return (
    <Wrapper heading="Fast Facts">
      <BrandBar>
        <Nav>
          <NavDropdown onItemClick={onDropdownItemClick} items={dropdownItems}>
            {title}
          </NavDropdown>
        </Nav>
        {/* <EKULogo></EKULogo> */}
        {/* <span className="fs-4 me-3">Fast Facts</span> */}
      </BrandBar>
      <div>
        <RowColsGrid className="bd-example-row" rowCols={rowCols}>
          {chartsData.map(({ title, data, id }) => {
            const { numberType } = dataTypes[id];

            const valueFormatter = valueFormatters[numberType];

            return (
              <Fragment key={id}>
                <h6 className="text-uppercase fw-bold">{title}</h6>
                <CustomBarChart
                  {...{ valueFormatter, xAxisDataKey, barDataKey, data }}
                ></CustomBarChart>
              </Fragment>
            );
          })}
        </RowColsGrid>
      </div>
    </Wrapper>
  );
}

export default App;
