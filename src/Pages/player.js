import { useState } from "react";
import ReactHlsPlayer from "react-hls-player";
import {useParams} from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import * as React from 'react';
import Slider from '@mui/material/Slider';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { gen_self_define_video } from "../functions/main.js"

import HLSSource from './hls.js';


function valuetext(value) {
  return `${value}°C`;
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export default function Player() {
  const [hlsUrl, setHlsUrl] = useState(
    ""
  );
  const [starttime, setstarttime] = useState(
    
  );
  const [type, settype] = useState();
  const [hour, sethour] = useState("");
  const [minute, setminute] = useState("");
  const [duration, setduration] = useState(30);
  const handleduration = (event)=>{
    setduration(event.target.value)
  }
  const handlehourChange = (event)=>{
    sethour(event.target.value)
  }
  const handleminuteChange = (event)=>{
    setminute(event.target.value)
  }
  const handletypeChange = (event)=>{
    settype(event.target.value)
    if (event.target.value=="All"){
      setHlsUrl("https://10.227.106.11:8000/video/"+device+"/all.m3u8")
    }
    if (event.target.value=="Error"){
      setHlsUrl("https://10.227.106.11:8000/video/"+device+"/error.m3u8")
    }
    if (event.target.value=="Self-define"){
      setHlsUrl("https://10.227.106.11:8000/video/"+device+"/self-define.m3u8")
    }
  }
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );
  const genVideo = async()=>{
    await gen_self_define_video(device,hour,minute,duration)
    setHlsUrl("")
    await delay(1000);
    setHlsUrl("https://10.227.106.11:8000/video/"+device+"/self-define.m3u8")
  }
  const hour_list = [...Array(24).keys()]
  const minute_list = [...Array(60).keys()]
  const {device} =useParams()
  React.useEffect(() => {
    setHlsUrl("https://10.227.106.11:8000/video/"+device+"/all.m3u8")
  }, [])
  return (
    <div className="row justify-content-center">
      <Grid container spacing={1}>
        <Grid item xs={3}>
        <FormControl fullWidth className="m-2">
          <InputLabel id="demo-simple-select-label">Select your video type...</InputLabel>
          <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Search by project..."
              onChange={handletypeChange}
          >
            <MenuItem value={"Error"}>Error</MenuItem>
            <MenuItem value={"Error"}>1 Minute</MenuItem>
            <MenuItem value={"Error"}>3 Minutes</MenuItem>
            <MenuItem value={"Error"}>5 Minutes</MenuItem>
            <MenuItem value={"Error"}>10 Minutes</MenuItem>
            <MenuItem value={"Self-define"}>Self-define</MenuItem>
          </Select>
          </FormControl>
        </Grid>
        {(type=="Self-define")?
          <Grid item xs={1}  >
      <FormControl fullWidth className="m-2">
      <InputLabel id="demo-simple-select-label">hour</InputLabel>
      <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={hour}
            MenuProps={MenuProps}
            label="Search by project..."
            onChange={handlehourChange}
        >
          {
              hour_list.map(function(object,i){
                  return <MenuItem value={object}>{object}</MenuItem>;
              })
          }
      </Select>
      </FormControl>
      </Grid>:<div></div>}
      {
        (type=="Self-define")?
        <Grid item xs={1}  >
      <FormControl fullWidth className="m-2">
      <InputLabel id="demo-simple-select-label">minute</InputLabel>
      <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={minute}
            MenuProps={MenuProps}
            label="Search by project..."
            onChange={handleminuteChange}
        >
          {
              minute_list.map(function(object,i){
                  return <MenuItem value={object}>{object}</MenuItem>;
              })
          }
      </Select>
      </FormControl>
      </Grid>:<div></div>
      }
      {
        (type=="Self-define")?
        <Grid item xs={3}>
      <Slider
        className="m-2 my-4"
        aria-label="Temperature"
        defaultValue={30}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={10}
        marks
        min={10}
        max={300}
        onChange={handleduration}
      />
      </Grid>:<div></div>
      }
        {
          (type=="Self-define")?
          <Grid item xs={1} className="m-4">
          <Button variant="contained" onClick={genVideo}>Generate</Button>
        </Grid>:<div></div>}
      </Grid>
      <ReactHlsPlayer
        className="player-window"
        src={hlsUrl}
        autoPlay={false}
        controls={true}
        width="60%"
        height="auto"
      />
      {/* <Player>
      <HLSSource
        isVideoChild
        src={hlsUrl}
      />
    </Player> */}
    </div>
  );
}
