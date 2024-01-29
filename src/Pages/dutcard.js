import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import TextField from '@mui/material/TextField';
import { dut_modify,dut_info } from "../functions/main.js"

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
export default function DutCard(props) {
  const [editornot, seteditornot] = useState(0);
  const [vssim, setssim] = useState(props.package.ssim);
  const [vthreshold, setthreshold] = useState(props.package.threshold);
  const handleedit = ()=>{
    seteditornot(1)
  }
  const submitedit= (name,ssim,threshold)=>{
    seteditornot(0)
    dut_modify(name,ssim,threshold)
  }
  const renew=()=>{
    dut_info(props.package.machine).then(res => {
      setssim(res.data.ssim)
      setthreshold(res.data.threshold)
    })
  }
  React.useEffect(()=>{
    renew()
  }, [props.package.machine])
  return (
    <Box sx={{ maxWidth: 250 }}>
      <Card variant="outlined">
            {editornot===0 &&
            <React.Fragment>
            <CardContent>
            <Typography variant="h5" component="div">
                DUT
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {props.package.machine}
            </Typography>
              <Typography variant="body2">
                Threshold: {vthreshold}
                <br />
                SSIM: {vssim}
                <br />
                status: {props.package.status}
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
                DUT
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {props.package.machine}
            </Typography>
              <Typography variant="body2">
              <TextField id="filled-basic" label="Threshold" variant="standard" defaultValue={props.package.threshold} onChange={ e => setthreshold(e.target.value)}/>
              <TextField id="filled-basic" label="SSIM" variant="standard" defaultValue={props.package.ssim} onChange={ e => setssim(e.target.value)}/>
            </Typography>
            </CardContent>
            <CardActions>
            <Button size="small" onClick={() => submitedit(props.package.machine,vssim,vthreshold)}>Save</Button>
            </CardActions>
        </React.Fragment>
            }
      </Card>
    </Box>
  );
}