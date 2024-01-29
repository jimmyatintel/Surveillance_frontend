import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { dbg_modify,dbg_info } from "../functions/main.js";
import { useState } from "react";
import TextField from '@mui/material/TextField';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function DbgCard(props) {
  const [editornot, seteditornot] = useState(0);
  const [vowner, setowner] = useState();
  const [vthreshold, setthreshold] = useState();
  const handleedit = ()=>{
    seteditornot(1)
  }
  const submitedit= (name,owner)=>{
    seteditornot(0)
    dbg_modify(name,owner)
  }
  const renew=()=>{
    dbg_info(props.package.ip).then(res => {
      setowner(res.data.owner)
    })
  }
  React.useEffect(()=>{
    renew()
  }, [props.package.hostname])
  return (
    <Box sx={{ maxWidth: 250 }}>
      <Card variant="outlined">
      {editornot===0 &&
        <React.Fragment>
            <CardContent>
            <Typography variant="h5" component="div">
                Debug Host
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {props.package.hostname}
            </Typography>
            <Typography variant="body2">
                ip: {props.package.ip}
                <br />
                owner: {vowner}
                <br />
            </Typography>
            </CardContent>
            <CardActions>
            <Button size="small" onClick={handleedit}>Edit</Button>
            </CardActions>
        </React.Fragment>
      }
      {editornot===1 &&
        <React.Fragment>
            <CardContent>
            <Typography variant="h5" component="div">
                Debug Host
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {props.package.hostname}
            </Typography>
            <Typography variant="body2">
            <TextField id="filled-basic" label="Owner" variant="standard" defaultValue={props.package.owner} onChange={ e => setowner(e.target.value)}/>
            </Typography>
            </CardContent>
            <CardActions>
            <Button size="small" onClick={() => submitedit(props.package.ip,vowner)}>Save</Button>
            </CardActions>
        </React.Fragment>
      }
      </Card>
    </Box>
  );
}