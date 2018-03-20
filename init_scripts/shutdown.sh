DATABASE=$1


if [ $DATABASE == 'postgresql' ]
then
	pg_ctl -D /usr/local/var/postgres stop -s -m fast
fi

if [ $DATABASE == 'mongodb' ]
then
    echo 'killing mongod'
	PID=$(pgrep mongo)
	kill $PID
fi