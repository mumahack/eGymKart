import {EGymMessage} from './EGymMessage';

const onFirstSpace = /\s(.+)/;
export const parseMessage = (rawDataString: string): EGymMessage => {
  const [command, body] = rawDataString.split(onFirstSpace);
  return {
	command,
	body: JSON.parse(body)
  };
};
