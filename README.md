# map-side-bar
## Contributors
Back-End Design, Testing, Front-End Refactoring: Sean Lang-Brown
Intitial Front-End Implementation: Paolo Roxas, 


## Purpose
This service forms a part of the WeGot food review website. It renders basic information about a restaurant, including the opening hours, address, phone number, and links to website and to google maps for directions. In addition, the service renders a map centered on the location of the restaurant, with a labeled marker.

## Description
The service is composed of a server, a  client, and a database.
### Server API
- A request to the root will redirect to the /restaurants/:id path with a default restaurant id
- Serves static client files in response to a GET request to the /restaurants/:id path
- It also serves json formatted restaurant data in response to a GET request to the /api/restaurants/:id/sidebar endpoint.
### Database
A MongoDB database that holds restaurant information.
### Client
Takes in a restaurant ID and requests restaurant information from the server. Renders the information.

## Getting Started
### Prerequisites
- npm
- node
- jest
- webpack
- MongoDB (or PostgreSQL and python)
- (statsD + graphite + grafana for data collection: docker images reccomended)

### Installation
1. Install dependencies: `npm install`
2. Build client files: `npm run react-dev`
3. Start database and web server: `npm run-script start-mongo` or `npm run-script start-postgres`
4. Seed database:
	a) generate data: `node seedDB/writeDataToFile.js`
	b1) mongoDB: `mongoimport -h 127.0.0.1:27017 --db wegot-sidebar --collection restaurants --drop --file seedDB/fakerData.json`
	or b2) postgresql: `python3 fakerJSONtoCSVnoPeriods.py`, then `psql -d postgres -a -f seedWegotSidebar.sql`
5. `Ctrl-C` to quit, then: `npm run-script stop-mongo` or `npm run script stop-postgres`
6. Data collection: Default configuration is to report server response rps/time and database query rps/time to statsD at localhost
7. Load testing: `npm install -g artillery`, then `artillery run -e local artillery_service-load.yml` you may `npm install -g artillery-plugin-statsd` to send load data to statsD

To start, in your browser navigate to: [http://localhost:3003](http://localhost:3003)

## Tests
Run: `npm test`
