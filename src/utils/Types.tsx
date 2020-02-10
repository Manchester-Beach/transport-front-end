export interface TramDeparture {
  destination: string;
  timeUntilDeparture: number;
}

export interface Station {
  name: string;
  crs: string;
}

export interface StationOption {
  value: Station;
  label: string;
}

export class JourneyType {
  constructor(originCrs: string, destinationCrs: string, originStation: string, destinationStation: string){
    this.originCrs = originCrs;
    this.destinationCrs = destinationCrs;
    this.originStation = originStation;
    this.destinationStation = destinationStation;
    this.key = Math.random() * 10000000;
  }
  originCrs: string;
  destinationCrs: string;
  originStation: string;
  destinationStation: string;
  key: number;
}

export type JourneyCardProps = {
  journeyData : JourneyType,
  parentCallback: () => void
}