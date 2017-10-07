export interface EGymMessage {
  command: string;
  object: EGymObject;
}

export interface EGymObject {
  rfid: string;
  timestamp: string;
  machine_id: string;
  machine_type: string;
  payload: EGymMessagePayload;
}

export interface EGymMessagePayload {
  position?: number;
}
