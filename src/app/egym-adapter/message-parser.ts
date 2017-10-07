import {EGymMessage} from './EGymMessage';

const firstSpaceRegex = /\s(.+)/;
export const parseMessage = (data): EGymMessage => {
  const [command, body] = data.split(firstSpaceRegex);
  return {
	command,
	body: JSON.parse(body)
  };
};
