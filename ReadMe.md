## Digital Signal Processing Toolkit 
hosted by DISP Lab ***(Digital Image and Signal Processing Laboratory)***

after you have cloned the directory, there will be 2 main subdirectories:  
"/frontend/" and "/backend/", which our frontend work and backend work is separated.

## Prerequisite for hosting website in your local machine (for Ubuntu)
1. Check your current IPaddress using ```ifconfig```

2. Allowed the local machine on external access for PORT 3000 and 5000:  
```sudo ufw allow 3000,5000```  

3. make sure to install ***screen*** ```sudo apt install screen```  
to check any attached/detached socket, use ```screen -ls```  
to reattach a previous socket, use ```screen -r sessionID```  
to kill a session, use ```screen -X -S sessionID_you_want_to_kill quit```

## Frontend (React.js)
### How to run
0. in terminal, ```screen -S website_frontend_session```, this will create a background session.

1. first, cd to "/final/frontend"

2. Type ```yarn``` in your cmd to install all the packages included in ```package.json```

3. Type ```yarn start``` and enjoy, the server is run on ```http://yourIPaddress:3000/```  
the hosting ip address can be change in ```/frontend/src/axios_instance.js```

#### or alternatively hosting with Apache2 web server, by default it will use PORT 80. (this is a much stable method.)
3. After finish editing website, check locally that everything works fine. Then, ```yarn run build```, this will prepare the production-ready static HTML into a bundle.

4. copy everything inside the ```/build/``` directory to ```/var/www/html/```:  
```sudo cp -a ./build/. /var/www/html/```

5. ```cd /var/www/html/```, make sure there is a fill call ```.htaccess```, which the content will look like:  
  ```
  Options -MultiViews 
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteRule ^ index.html [QSA,L]
  ```

6. make sure that ```/etc/apache2/apache2.conf``` has the current snippet:  
  ```
  <Directory /var/www/html>

       Options Indexes FollowSymLinks

       AllowOverride All

       Require all granted

  </Directory>
  ```

7. restart the apache2 server:  ```sudo service apache2 restart```

8. If there's any bug, please consult stackoverflow XDD


## Backend (Python)
### Setting up environment
1. first, cd to "/final/backend"

2. libraries/framework required:  
  - flask, flask-cors
  - librosa 
  - opencv-python, pillow, matplotlib
  - scipy, pyfftw, multiprocess
  - numpy
  - python-dotenv
  
**you can just do it in a one liner:**
```pip install flask flask-cors librosa opencv-python pillow matplotlib scipy pyfftw multiprocess numpy python-dotenv```  

### How to run 
0. in terminal, ```screen -S website_backend_session```, this will create a background session.

1. first, cd to "/backend/"

2. use the command line: ```flask run --host=yourIPaddress --no-debugger ```, which is my case ```yourIPaddress = 140.112.175.129```  

3. You may see something like this getting printed on terminal:  
  ```
  * Serving Flask app "base.py" (lazy loading)
  * Environment: development
  * Debug mode: on
  * Running on http://140.112.175.129:5000/ (Press CTRL+C to quit)
  ```
  this indicates that the backend (apis) is listening at ```http://yourIPaddress:5000/```
