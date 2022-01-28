import { useState, useEffect } from 'react'
import { Button } from '@mui/material';
import styled from 'styled-components';
import axios from '../../../axios_instance';
import './Body2.css';
import b from '../../example_audio/handel.wav'
import a from '../../example_audio/Chord.wav'
import c from '../../example_audio/sample.wav'

const Wrapper = styled.section`
  border: 2px solid gray;
  flex-wrap: wrap;
  width: 65%;
  height: 65vh;
  display: flex;
  flex-direction: row;
  position: relative;
  left: 20%;
  top: 35px;
`;

export default function Body2() {
    // Audio
    const [audio, setAudio] = useState(a);
    const [file, setFile] = useState(null);
    const [timeDuration, setTimeDuration] = useState(0.0);
    
    const retrieveBlob = async (x, fn) => {
        let blob = await fetch(x).then(r => r.blob());
        let file = new File([blob], fn, { type: "audio/wav" });
        let temp = document.getElementById("audio");
        temp.onloadedmetadata = function() {
            setTimeDuration(temp.duration);
        };
        setFile(file);
    }
    
    //Retrieve one time
    if(file === null) {
        retrieveBlob(a, "Chord.wav");
    }
    //Initialize sample audio
    const sample_sound = [a, b, c];
    const sample_filename = ["Chord.wav", "handel.wav", "sample.wav"];

    const [fileName, setFileName] = useState(sample_filename[0]);

    //Parameters
    const [speed, setSpeed] = useState(1.0);
 

    //Status
    const [status, setStatus] = useState("convert");
    const [hasDone, sethasDone] = useState(false);
    const [convertedAudio, setconvertedAudio] = useState("");
    
    const handleChange = (func) => (event) => {
        console.log(event.target.files[0]);
        setFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
        let urlObj;
        if(event.target.files[0] !== null){
            urlObj = URL.createObjectURL(event.target.files[0]);
            func(urlObj);
        }
        let temp = document.getElementById("audio");
        temp.onloadedmetadata = function() {
            setTimeDuration(temp.duration);
        };
    };

    //Done calculation pop out additional DOM
    const DoneAudio = (
        <div id="done_audio_div">
            <div id="adjusted_audio_text">
                Adjusted Audio:
            </div>
            <div id="done_audio">
                <audio src = {convertedAudio} controls></audio>
            </div>
            <Button id="download_button" size = "large" variant="contained" color="success" style={{ width: 120, height: 60 }} >
                <a href = {convertedAudio} download = {fileName.split(".")[0] + "_adjusted.wav"}>Download</a>
            </Button> 
            
        </div>
    );

    const increment = () => {
        setSpeed(speed + 0.25);
        // isDisabled1();
    }
    const decrement = () => {
        setSpeed(speed - 0.25);
        // isDisabled2();
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

    const uploadAudio = async () => {
        console.log(`time duration is ${timeDuration}`)
        console.log("uploading to audio to backend.. waiting for response");
        setStatus("Loading");
        const formData = new FormData();  
        formData.append('file' ,file);
        formData.append('fileName' , fileName);
        formData.append('speed', speed);
        formData.append('timeDuration', timeDuration);

        const res = await axios.post('/api/speed-adjustment', formData , {
        headers: {'Content-Type': 'multipart/form-data; '},
        });
        
        console.log("received based64 string as processed audio");
        const audio = res.data.snd;
        setconvertedAudio(`data:audio/mp3;base64,${audio}`);
        setStatus("Convert");
        sethasDone(true);
      }
  

    return(
        <div>
        <div style={{position: "relative", left: "11%", top:"60px",fontWeight:"bold", fontSize:"30px", fontFamily: "Comic Sans MS, Comic Sans, cursive" }}>Try out:</div>
        <Wrapper style = {{backgroundColor: "white"}}>
             <div id="title">
                <p id="top_title">Upload Audio File</p>
            </div>
            <div id="audio_sample">
                <p className="audio_sample_text">Audio Sample:</p>
                <div className = "selbar_div">
                    <div id="selbar1">
                        <select id="selbar" onChange = {sampleChange()}>
                            <option value = "Chord" >Chord</option>
                            <option value = "handel" >Handel</option>
                            <option value = "sample" >Sample</option>
                        </select>
                    </div>
                    <div id="input_aud1">
                        <input type="file" id="input_aud" accept = ".wav" onChange={handleChange(setAudio)} />
                    </div>
                </div>
                <div id="audio_div">
                    <audio id="audio" preload = "auto" src = {audio} controls></audio>
                </div>
            </div>
            <div id="speed_adjust_text">Speed Adjustment:</div>

            <div id ="adjust_speed_div">       
                {/* <div className="adjust_speed_button">   */}
                <button id = "b1" onClick = {decrement} disabled={speed<= 0.25}>-</button>       
                {/* </div> */}
                <div id="current_speed_display" > {speed} </div>
                {/* {speed} */}
                {/* <div className="adjust_speed_button"> */}
                <button id = "b2" onClick = {increment} disabled={speed >= 2.5}>+</button>  
                {/* </div> */}
            </div>

            <div id="supported_text">Supported audio file format: WAV</div>
            <div id="convert_button">
                <Button size = "large" variant="contained"  onClick={uploadAudio} disabled = {status === "Loading"}
                    style={{ width: 160, height: 70 }} >
                    {status}
                </Button>
            </div>
            
            {hasDone ? DoneAudio : null}

        </Wrapper>
        </div>
    )
}