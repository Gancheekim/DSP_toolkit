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
