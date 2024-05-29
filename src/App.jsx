import { useState, useMemo } from "react";

import { useResponseText } from "./hooks/useResponseText";
import { CSVTo2DArray } from "./js/CSVTo2DArray";
import { dataFiles } from "./js/dataFiles";
import { keys } from "./js/keys";

function App() {
  const [dataFileID] = useState(dataFiles[3].id);

  const dataFile = dataFiles.find(({ id }) => id === dataFileID);

  const csvText = useResponseText(dataFile.location);

  const chartsData = useMemo(() => {
    const rows = CSVTo2DArray(csvText);

    const container = {};

    rows.forEach((row) => {
      const group = row[keys.group];

      if (!(group in container)) {
        container[group] = [];
      }

      container[group].push(row);
    });

    return container;
  }, [csvText]);

  console.log(chartsData);

  return <></>;
}

export default App;
