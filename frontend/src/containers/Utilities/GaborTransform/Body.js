import { useState, useEffect } from 'react'
import { Button } from '@mui/material';
import styled from 'styled-components';
import axios from '../../../axios_instance';
import './Body.css'
import img from '../../example_image/body_init.jpg';
import b from '../../example_audio/handel.wav'
import a from '../../example_audio/Chord.wav'
import c from '../../example_audio/sample.wav'


const Wrapper = styled.section`
  width: 80%;
  height: 80vh;
  display: flex;
  flex-direction: row;
  position: relative;
  // left: 23%;
  // margin: auto;
  left: 11%;
  top: 30px;
`;

const Left = styled.div`
  float:left;
  height:100%;
  width: 71%;
  border-style: groove;
  overflow-x: scroll;
  overflow-y: hidden;
`;

const Right = styled.div`
  height:100%;
  width: 29%;
  border-style: ridge;
`;


export default function Body() {
    const [file, setFile] = useState(null);
    const [audio, setAudio] = useState(a);
    const [timeDuration, setTimeDuration] = useState(0.0);

    const retrieveBlob = async (x, fn) => {
      let blob = await fetch(x).then(r => r.blob());
      let file = new File([blob], fn, { type: "audio/wav" });
      setFile(file);
      let temp = document.getElementById("audio");
      temp.onloadedmetadata = function() {
        setTimeDuration(temp.duration);
    };
  }
  
    //Retrieve one time
    if(file === null) {
        retrieveBlob(a, "Chord.wav");
    }

    //Initialize sample audio
    const sample_sound = [a, b, c];
    const sample_filename = ["Chord.wav", "handel.wav", "sample.wav"];

    const [image, setImage] = useState(img);
    const [imageWidth, setImageWidth] = useState("400");
    const [status, setStatus] = useState("Analyse");
    const [fileName,setFileName] = useState("title.jpg");
  
    const [lowerfreq, setlowerfreq] = useState(0);
    const [upperfreq, setupperfreq] = useState(500);

    const handleChange = (func) => (event) => {
      setFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
      if(event.target.files[0] !== null){
        const urlObj = URL.createObjectURL(event.target.files[0]);
        func(urlObj);
      }
      let temp = document.getElementById("audio");
      temp.onloadedmetadata = function() {
          setTimeDuration(temp.duration);
      };
    };

    //Done calculation pop out additional DOM
    const DoneImage = (
        <Button id="download_button" size = "large" variant="contained" color="info" 
                style={{ width: 170, height: 45, position:"relative", left:"-22%", top: "30%"}} >
            <a style={{fontSize:"12px"}} href = {image} download = {fileName.split(".")[0] + "_spectrum.jpg"}>Download Image</a>
        </Button>
    );

    const updateLower = () => (event) => {
      setlowerfreq(event.target.value);
    }

    const updateUpper = () => (event) => {
      setupperfreq(event.target.value);
    }

    const uploadAudio = async () => {
      console.log("uploading to audio to backend.. waiting for response")
      setStatus("Loading");
      const formData = new FormData();
      formData.append('lowerbound', lowerfreq);
      formData.append('upperbound', upperfreq);
      formData.append('file' ,file);
      formData.append('fileName' , fileName);
      formData.append('timeDuration', timeDuration);

      try {
        const res = await axios.post('/api/TF-spectrum', formData , {
          headers: {'Content-Type': 'multipart/form-data; '},
        });
        setImage(`data:image/jpg;base64,${res.data.img}`);
        setImageWidth(res.data.width);
        console.log("response received, update canvas")
        setStatus("Analyse");
      }
      catch (error) {alert("an error has occured, please refresh the page!")}
    }

    //Change sample audio
    const sampleChange = () => (event) => {
      if(event.target.value == "Chord"){
          setAudio(sample_sound[0]);
          setFileName(sample_filename[0]);
          retrieveBlob(a, "Chord.wav");
      }
      else if(event.target.value == "handel"){
          setAudio(sample_sound[1]);
          setFileName(sample_filename[1]);
          retrieveBlob(b, "handel.wav");
      }
      else{
          setAudio(sample_sound[2]);
          setFileName(sample_filename[2]);
          retrieveBlob(c, "sample.wav");
      }
  }

    return (
      <>
      <div style={{position: "relative", left: "11%", top:"60px",fontWeight:"bold", fontSize:"30px", fontFamily: "Comic Sans MS, Comic Sans, cursive" }}>Try out:</div>
      <div style={{position:"relative", left:"8%", top:"12vh", fontWeight:"bold", fontSize:"18px", fontFamily: "Comic Sans MS, Comic Sans, cursive", color:"black", textShadow:"1px 1px white"}}>Hz</div>
      <div style={{position:"relative", left:"12%", top:"90.5vh", fontWeight:"bold", fontSize:"18px", fontFamily: "Comic Sans MS, Comic Sans, cursive", color:"black", textShadow:"1px 1px white"}}>Sec</div>
      <Wrapper>
        <Left style={{backgroundColor:"white"}}>
          <img src = {image} height="100%" ></img>
        </Left>
        <Right style={{backgroundColor:"white"}}>
          <div className="temp1" style={{fontSize:"30px", fontWeight:"bolder", position:"relative", left:"5%", padding:"5px"}}>
            Upload Audio File
          </div>
          <select className="selbar"  onChange = {sampleChange()} style={{position:"relative", left:"8%", padding:"10px", margin:'5px'}}>
            <option value = "Chord" >Chord</option>
            <option value = "handel" >Handel</option>
            <option value = "sample" >Sample</option>
          </select>
          <audio id="audio" className="temp2" preload = "auto" src = {audio} controls 
              style={{position:"relative", left:"0%", top:"-10px"}}> </audio>
          
          <input className="temp3" type="file" id="input_aud" accept = ".wav," onChange={handleChange(setAudio)} 
            style={{position:"relative", left:"5%", top:"-25px"}}/>

          <div style={{position:"relative", left:"25px", top:"-25px", fontSize:"17px", fontStyle:"italic"}}>
          Supported audio file format: WAV
          </div>
          <div style={{position:"relative", left:"25px", top:"-5px", fontSize:"17px", fontWeight:"bold"}}>
            Frequency range selection (Hz):
          </div>
          
          <div className="slider_container1" style={{position:"relative", left:"5%", top:"10px", fontSize:"15px"}}>
            Lower Bound
            <div className="slider1" style={{left:"15px", width:"115px"}} >
              <input className="slider" type = "range" min="0" max="2000" onChange={updateLower()} />
            </div>
            <div id="lower_slider_value" style={{position:"absolute", left:"180px",color:"white", top: "0px", fontWeight:"bolder", zIndex:"2", textShadow:"1px 1px black"}}>{lowerfreq}</div>
            <div style={{position:"absolute", left:"110px", top: "20px", fontWeight:"bolder"}}>0</div>
            <div style={{position:"absolute", left:"250px", top: "20px", fontWeight:"bolder"}}>2000</div>
          </div>
            <div className="slider_container2" style={{position:"relative", left:"5%", top:"32px", fontSize:"15px"}}>
              Upper Bound
              <div className="slider2" style={{left:"15px", width:"115px"}}>
                <input className="slider" type = "range" min={lowerfreq} max="8000" onChange={updateUpper()}/>
              </div>
              <div id="upper_slider_value" style={{position:"absolute", left:"180px",color:"white", top: "0px", fontWeight:"bolder", zIndex:"2", textShadow:"1px 1px black"}}>{upperfreq}</div>
              <div style={{position:"absolute", left:"110px", top: "20px", fontWeight:"bolder"}}>500</div>
              <div style={{position:"absolute", left:"250px", top: "20px", fontWeight:"bolder"}}>8000</div>
          </div>
          <Button size = "large" className="temp4" variant="contained" color="success" disabled = {status === "Loading"}
            style={{ width: 160, height: 70, position:"relative", left:"26%", top:"80px"}} onClick={uploadAudio}>
            {status}
          </Button>
          {DoneImage}
        </Right>
      </Wrapper>
      </>
    )
}

