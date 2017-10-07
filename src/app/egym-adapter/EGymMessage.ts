export interface EGymMessage {
  command: string;
  body: EGymBody;
}

export interface EGymBody {
  rfid: string;
  timestamp: string;
  machine_id: string;
  machine_type: string;
  payload: EGymMessagePayload;
}

export interface EGymMessagePayload {
  position?: number;
}
