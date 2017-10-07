import React from 'react';
import ReactDOM from 'react-dom';

import EnergyUsageApp from './energy-usage-app.jsx';

// Importing these here will include them on the resulting page
import energieStyles from './styles/energie.css';
import mainStyles from './styles/main.css';
import milligramStyles from './styles/milligram.min.css';

const appContainer = document.querySelector("#app");

ReactDOM.render(<EnergyUsageApp />, appContainer);
