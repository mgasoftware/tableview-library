# Table View Library

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/tableview-library.svg)](https://www.npmjs.com/package/tableview-library) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save tableview-library
```
## Main features

- ☀️ Select days, ranges or whatever
- 🧘‍♀️ using [date-fns](http://date-fns.org) as date library
- 🌎 Localizable into any language
- ➡️ Keyboard navigation
- ♿️ [WAI-ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) support
- 🤖 Written in TypeScript
- 🎨 Easy to style and customize
- 🗓 Support multiple calendars
- 📄 Easy to integrate input fields

## Installation

```shell
npm install react-day-picker date-fns  # using npm
pnpm install react-day-picker date-fns # using pnpm
yarn add react-day-picker date-fns     # using yarn
```

<a href="https://www.npmjs.com/package/react-day-picker">
  <img src="https://img.shields.io/npm/v/react-day-picker.svg?style=flat-square" alt="npm version"/>
</a> <a href="http://npm-stat.com/charts.html?package=react-day-picker">
  <img src="https://img.shields.io/npm/dm/react-day-picker.svg?style=flat-square" alt="npm downloads"/>
</a> <a href="https://github.com/gpbl/react-day-picker/stargazers">
<img src="https://img.shields.io/github/stars/gpbl/react-day-picker?style=flat-square" alt="stars"/>
</a> <a href="https://github.com/sponsors/gpbl">
  <img src="https://img.shields.io/github/sponsors/gpbl?style=flat-square" alt="sponsors"/>
</a>

## Example

```tsx
import React from 'react';

import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function Example() {
  const [selected, setSelected] = React.useState<Date>();

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, 'PP')}.</p>;
  }
  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={setSelected}
      footer={footer}
    />
  );
}
```

## Documentation

## License

MIT © [mgasoftware](https://github.com/mgasoftware)
