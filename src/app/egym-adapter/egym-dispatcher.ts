import {EGymMessage} from './EGymMessage';
import {createEGymConnector} from './egym-connector';

export type EGymEventListener = (message: EGymMessage) => void;

export interface EgymEventDispatcher {
  registerListener: (listener: EGymEventListener) => void;
  update: (message: EGymMessage) => void;
}

export const createEGymEventDispatcher = (): EgymEventDispatcher => {
  const listeners = [];
  const eGymEventDispatcher = {
	registerListener: (listener: EGymEventListener) => {
	  listeners.push(listener);
	},
	update: (message: EGymMessage) => {
	  listeners.forEach(listener => listener(message));
	}
  };
  const eGymConnector = createEGymConnector();
  eGymConnector.registerEGymHubListener(eGymEventDispatcher)
  return eGymEventDispatcher;
};

