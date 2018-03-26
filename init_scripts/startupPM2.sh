#use pm2 in npm start like this: pm2 node server/index.js  --name 'wegotSidebar' --watch"


./port80Access.sh

npm install pm2 -g

npm start

#create pm2 start script
sudo su -c "env PATH=$PATH:/usr/local/bin pm2 startup amazon -u ec2-user --hp /home/ec2-user"

#tell pm2 to restart all processes when server reboots
pm2 save


# Show all running apps and their status
# $ pm2 list

# Show more details about an app
# $ pm2 show helloworld

# View logs for one of your apps
# $ pm2 logs helloworld then ctrl+c to exit log view.

# Stop your node app.
# $ pm2 stop helloworld

# Start your app.
# $ pm2 start helloworld

