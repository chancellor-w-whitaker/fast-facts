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
import { dataFiles } from "./js/dataFiles";
import { dataTypes } from "./js/dataTypes";
import { dataKeys } from "./js/dataKeys";
import { Nav } from "./components/Nav";

// ? find all caps font

// ! put in template
// ! move dropdown to middle or left
// ! logic for including desc property

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
        </Section>
      </MainContainer>
    </>
  );
}

export default App;
