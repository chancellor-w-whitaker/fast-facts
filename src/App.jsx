import {
  CartesianGrid,
  BarChart,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
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
import { Section } from "./components/Section";
import { EKULogo } from "./components/EKULogo";
import { dataFiles } from "./js/dataFiles";
import { Nav } from "./components/Nav";

function App() {
  const [fileID, setFileID] = useState(initialFileID);

  const { title: dropdownTitle, url } = dataFiles.find(
    ({ id }) => id === fileID
  );

  const csvText = useResponseText(url);

  const chartsData = useMemo(() => getChartsData(csvText), [csvText]);

  const dropdownItems = useMemo(() => updateDropdownItems(fileID), [fileID]);

  const onDropdownItemClick = useCallback((id) => setFileID(id), []);

  console.log(chartsData);

  return (
    <MainContainer>
      <BrandBar>
        <EKULogo></EKULogo>
        <Nav>
          <NavDropdown onItemClick={onDropdownItemClick} items={dropdownItems}>
            {dropdownTitle}
          </NavDropdown>
        </Nav>
      </BrandBar>
      <Section>
        <div className="row row-cols-2">
          {chartsData.map(({ title, id }) => (
            <div className="col" key={id}>
              <div>
                <div>{title}</div>
                <div>
                  <Chart></Chart>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </MainContainer>
  );
}

const Chart = () => {
  return (
    <BarChart height={250} data={[]}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar fill="#8884d8" dataKey="pv" />
    </BarChart>
  );
};

const Header = () => {
  return (
    <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <a
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        href="/"
      >
        <svg className="bi me-2" height={32} width={40}>
          <use xlinkHref="#bootstrap" />
        </svg>
        <span className="fs-4">Simple header</span>
      </a>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Features
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Pricing
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            FAQs
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            About
          </a>
        </li>
      </ul>
    </header>
  );
};

export default App;
