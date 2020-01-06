import React, { Component } from "react";
import PropTypes from "prop-types";
import { Station, StationOption } from "../../utils/Types";
import AsyncSelect from "react-select/async";

type FormState = {
  selectedStation: Station;
};

type FormProps = {
  placeholder: PropTypes.string;
  stations: Array<StationOption>;
  selectHandler: PropTypes.func;
};

class FormField extends Component<FormProps, FormState> {
  onStationSelected = (station: StationOption) => {
    console.log("Station", station);
    this.props.selectHandler(station.value);
  };

  filterStations = (inputValue: string) => {
    return this.props.stations.filter((i: StationOption) =>
      i.value.name.toLowerCase().includes(inputValue.toLowerCase())
    ).slice(0,20);
  };

  promiseOptions = (inputValue: string) =>
    new Promise(resolve => {
        resolve(this.filterStations(inputValue));
    });

  render() {
    return (
      <AsyncSelect
        cacheOptions
        defaultOptions={this.props.stations.slice(0,5)}
        loadOptions={this.promiseOptions}
        placeholder={"Select your " + this.props.placeholder}
        onChange={this.onStationSelected}
      />
    );
  }
}

export default FormField;
