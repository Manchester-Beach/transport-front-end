import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import FormField from "../FormField/FormField";
import Button from "react-bootstrap/Button";
import { Station, StationOption } from "../../utils/Types";
import ApiService from "../../utils/ApiService";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./JourneyForm.css";

type FormState = {
  fromStation?: Station;
  toStation?: Station;
  stationList: Array<Station>;
};

type FormProps = {
  refreshPage: () => void;
};

class JourneyForm extends Component<FormProps, FormState> {
  apiService: ApiService;

  constructor(props: FormProps) {
    super(props);
    this.apiService = new ApiService();
    // this.fromStationSelector = this.fromStationSelector.bind(this);
    // this.toStationSelector = this.toStationSelector.bind(this);
  }

  state: FormState = {
    fromStation: undefined,
    toStation: undefined,
    stationList: []
  };

  async componentDidMount() {
    var stations: Array<Station> = await this.apiService.getAllStations();
    this.setState({
      stationList: stations
    });
  }

  fromStationSelector = (station: Station) => {
    this.setState({
      fromStation: station
    });
  };

  toStationSelector = (station: Station) => {
    this.setState({
      toStation: station
    });
  };

  getStationOptions(): Array<StationOption> {
    var options: Array<StationOption> = [];

    for (let station of this.state.stationList) {
      const stationOption: StationOption = {
        label: station.name,
        value: station
      };

      options.push(stationOption);
    }

    return options;
  }

  addJourney = () => {
    console.log("Button pressed");
    if (this.state.fromStation && this.state.toStation) {
      let originCrs = this.state.fromStation.crs;
      let destinationCrs = this.state.toStation.crs;

      this.apiService.postJourney(originCrs, destinationCrs).then(() => this.props.refreshPage());
    }
  };

  render() {
    return (
      <div className="journeyForm">
        <Container className="formContainer">
          <h2>Add a Journey to Track</h2>
          <Form>
            <Row className="justify-content-md-center">
              <Col xs="12" md="5" lg="5">
                <FormField
                  placeholder="Origin Station"
                  stations={this.getStationOptions()}
                  selectHandler={this.fromStationSelector}
                />
              </Col>
              <Col xs="12" md="5" lg="5">
                <FormField
                  placeholder="Destination Station"
                  stations={this.getStationOptions()}
                  selectHandler={this.toStationSelector}
                />
              </Col>
              <Col xs="2" md="2" lg="2">
                <Button onClick={this.addJourney}>Add</Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    );
  }
}

export default JourneyForm;
