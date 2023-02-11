# Table View Library

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/tableview-library.svg)](https://www.npmjs.com/package/tableview-library) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save tableview-library
```
## Main features

- Sorting
- Search
- Column Ordering
- Custum number of table line

## Example

```jsx
import React, {useState} from 'react';

import TableView from 'tableview-library';
import 'tableview-library/dist/index.css';

export default function Example() {
  const[dataTable, setDataTable] = useState([{}]);
  const dataName = [];  // Name of each data to spread it on the table
  const keys = []; // Real name of each value from the dataTable

  return (
    <TableView
      columns={dataName}
      datas={dataTable}
      setDatas={setDataTable}
      keys={keys} 
    />
  );
}
```

## License

MIT © [mgasoftware](https://github.com/mgasoftware)
