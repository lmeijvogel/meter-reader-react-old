import React from 'react';
import {Component} from 'react';

import LoginScreen from './login-screen.jsx';
import CurrentUsage from './current-usage.jsx';
import UsageGraphs from './usage-graphs.jsx';
import ActualReadings from './actual-readings.jsx';

export default class EnergyUsageApp extends Component {
  constructor() {
    super();
    this.state = {
      liveData: {},
      loggedIn: true
    };
  }

  render() {
    if (this.state.loggedIn) {
      // Apparently, Chart.js doesn't understand 'height' and 'maxHeight' correctly, but only handles 'width' and 'max-width'.
      // The maxWidth here corresponds to filling a single screen (vertically) on my laptop.
      return (
        <div style={{maxWidth: "500px"}}>
          <div className="row">
            <CurrentUsage id={this.state.liveData.id} current={this.state.liveData.current} />
          </div>
          <div className="row">
            <UsageGraphs />
          </div>
          <div className="row">
            <ActualReadings
              stroom_dal={this.state.liveData.stroom_dal}
              stroom_piek={this.state.liveData.stroom_piek}
              gas={this.state.liveData.gas} />
          </div>
        </div>
      );
    } else {
      return <LoginScreen loginSuccessful={this.loggedIn.bind(this)} />
    }
  }

  componentDidMount() {
    this.startLiveDataTimer();
  }

  componentWillUnmount() {
    this.stopLiveDataTimer();
  }

  startLiveDataTimer() {
    var retrieveLiveData = this.retrieveLiveData.bind(this);
    this.timer = setInterval( retrieveLiveData, 3000 );
  }

  stopLiveDataTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  retrieveLiveData() {
    if (!this.state.loggedIn) {
      return;
    }
    fetch("/api/energy/current", {credentials: 'include'}).then( (response) => response.json()).then( (json) => {
      this.setState({
        liveData: {
          id: json.id,
          current: json.current,
          gas: json.gas,
          stroom_dal: json.stroom_dal,
          stroom_piek: json.stroom_piek
        }
      });
    }).catch( () => { // No 'finally'?!?
      this.setState({loggedIn: false});
      //this.setState({periodUsage: [], period: period, year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate(), loadingData: false});
    });
  }

  loggedIn() {
    this.setState({loggedIn: true});
  }

}
