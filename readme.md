# EGym Kart
An interactive and flexible adapter for the eGym Training Devices that maps certain real-time-training-data to a GameController.
Additionally it currently maps from the GameController to simulated Keyboard strokes so we are able to control games that are running on the machine.

## How to make it work?
- Checkout or Download this repository
- Execute `npm install` to install all dependencies
- If `npm install` fails, check if your OS has all package dependencies for [robotJS](https://github.com/octalmage/robotjs) (see section _Building_)
- Execute `npm start`

To start the tests, execute `npm test`

## A Note on Code Quality
This repository was implemented during a hackathon and we therefore had to put in some hacks to be fast (especially timeouts in tests. etc). Don't mind us - it was a long night ;)

## Architecture & Further Contribution
We set this repo up to be easily extendable by the eGym people.



## What would be next?
- Implement an App that lets players connect with each other via the eGym Screen, assign which player has which role for a game etc.
- Make the game be started by the Application instead of having it to start manually (like right now)
- Stream the started game to the application so all players can see it on their screens