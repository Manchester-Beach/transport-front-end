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

export class ServiceDataType {
  constructor(scheduledDepartureTime: string, expectedDepartureTime: string, arrivalTime: string, platform: string, cancelled: boolean){
    this.scheduledDepartureTime = scheduledDepartureTime;
    this.expectedDepartureTime = expectedDepartureTime;
    this.arrivalTime = arrivalTime;
    this.platform = platform;
    this.cancelled = cancelled;
  }
  scheduledDepartureTime: string;
  expectedDepartureTime: string;
  arrivalTime: string;
  platform: string;
  cancelled: boolean;
}