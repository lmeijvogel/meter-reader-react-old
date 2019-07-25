import * as React from "react";
import * as ReactDOM from "react-dom";

import { EnergyUsageApp } from "./components/EnergyUsageApp";
import { EnergyUsageAppStore } from './stores/EnergyUsageAppStore';

// Importing these here will include them on the resulting page
const energieStyles = require("./styles/energie.css");
const mainStyles = require("./styles/main.css");
const milligramStyles = require("./styles/milligram.min.css");

const appContainer = document.querySelector("#app");

const energyUsageStore = new EnergyUsageAppStore();

ReactDOM.render(<EnergyUsageApp store={energyUsageStore} />, appContainer);
