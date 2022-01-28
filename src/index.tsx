import './index.scss';

import pairs from './pairs.json';

import React from 'react';
import ReactDOM from 'react-dom';

import { TickerContainer } from './TickerContainer';

ReactDOM.render(
  <React.StrictMode>
    <TickerContainer pairs={pairs.pairs as any} />
  </React.StrictMode>,
  document.getElementById('root')
);
