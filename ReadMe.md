## Digital Signal Processing Toolkit 
### hosted by DISP Lab (Digital Image and Signal Processing Laboratory)

after you have git clone the directory, there will be 2 main subdirectories:  
"/frontend/" and "/backend/", which our frontend work and backend work is separated.

## Frontend (React.js)
### How to run
1. first, cd to "/final/frontend"

2. Type ```yarn``` in your cmd to install all the packages included in ```package.json```

3. Type ```yarn start``` and enjoy, the server is run on ```http://140.112.175.129:3000/```  
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
