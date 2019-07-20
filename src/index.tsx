import * as React from "react";
import * as ReactDOM from "react-dom";

import { EnergyUsageApp, EnergyUsageStore } from "./energy-usage-app";

// Importing these here will include them on the resulting page
const energieStyles = require("./styles/energie.css");
const mainStyles = require("./styles/main.css");
const milligramStyles = require("./styles/milligram.min.css");

const appContainer = document.querySelector("#app");

const energyUsageStore = new EnergyUsageStore();

ReactDOM.render(<EnergyUsageApp store={energyUsageStore} />, appContainer);
