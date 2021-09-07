# k6-loadtest-wordpress-login
This is https://k6.io/ load test script which you can use to load test the login flow and loading all posts page in wordpress

Place script.js in your server or computer, Make sure you update the domain and wp login credentials in the file
then execute the script to initiate the load testing

Install K6 bin as below for Debian
echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list 
sudo apt-get install k6                                                                

to run the performance testing run the script with command
k6 run scripts.js
