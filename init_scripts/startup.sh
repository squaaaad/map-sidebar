DATABASE = $1
WEBPACK = $2
DBPORT = $3

export DATABASE=$DATABASE

if [$DATABASE = 'postgresql']
then
	
fi

if [$DATABASE = 'mongodb']
then
	mongod --fork --logfile
fi

if [WEBPACK = 'build']
then
  npm run-script build
fi

node ../server/server.js -e DBMS=DATABASE -e DATABASE=DBPORT