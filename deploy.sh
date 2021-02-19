
# clean up old app
pm2 kill
npm remove pm2 -g

# installing dependencies
echo "Installing npm2"
npm install pm2 -g
echo "Running npm install"
npm install

# start app with pm2
echo "Running the app"
npm run start:production