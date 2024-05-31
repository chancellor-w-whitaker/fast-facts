import { useCallback, useState, Fragment, useMemo } from "react";

import { updateDropdownItems } from "./js/updateDropdownItems";
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
import { Chart } from "./components/Chart";
import { dataKeys } from "./js/dataKeys";
import { Nav } from "./components/Nav";

// ? find all caps font
// ! put in template
// ! move dropdown to middle or left
// ! make sure numbers fit in bar well
// ! would it be possible to set the position of the tooltip instead?

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
          <RowColsGrid className="bd-example-row small" rowCols={rowCols}>
            {chartsData.map(({ title, data, id }) => {
              const { numberType } = dataTypes[id];

              const valueFormatter = valueFormatters[numberType];

              const barLabel = {
                formatter: valueFormatter,
                position: "insideTop",
                fill: "white",
              };

              return (
                <Fragment key={id}>
                  <h5 className="text-uppercase fw-bold">{title}</h5>
                  <Chart
                    {...{
                      valueFormatter,
                      xAxisDataKey,
                      barDataKey,
                      barLabel,
                      data,
                    }}
                  ></Chart>
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
