import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import TextField from '@mui/material/TextField';
import { kvm_modify,kvm_info } from "../functions/main.js"
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography variant="h5" component="div">
        KVM
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        adjective
      </Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);

export default function KvmCard(props) {
  const [editornot, seteditornot] = useState(0);
  const [vowner, setowner] = useState();
  const [vip, setip] = useState();
  const [vnas, setnas] = useState();
  const handleedit = ()=>{
    seteditornot(1)
  }
  const submitedit= (name,vowner, vip, vnas)=>{
    seteditornot(0)
    kvm_modify(name,vowner, vip, vnas)
  }
  const renew=()=>{
    kvm_info(props.package.hostname).then(res => {
      setowner(res.data.owner)
      setip(res.data.ip)
      setnas(res.data.setnas)
    })
  }
  React.useEffect(()=>{
    renew()
  }, [props.package.hostname])
  return (
    <Box sx={{ maxWidth: 270 }}>
      <Card variant="outlined">
      {editornot===0 &&
        <React.Fragment>
            <CardContent>
            <Typography variant="h5" component="div">
                KVM
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {props.package.hostname}
            </Typography>
            <Typography variant="body2">
                ip: {props.package.ip}
                <br />
                owner: {props.package.owner}
                <br />
                status: {props.package.status}
                <br />
                version: {props.package.version}
                <br />
                NAS ip: {props.package.nas_ip}
                <br />
                Stream url: {props.package.stream_url}
                <br />
                Stream status: {props.package.stream_status}
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
            KVM
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props.package.hostname}
        </Typography>
        <Typography variant="body2">
        <TextField id="filled-basic" label="IP" variant="standard" defaultValue={props.package.ip} onChange={ e => setip(e.target.value)}/>
        <TextField id="filled-basic" label="Owner" variant="standard" defaultValue={props.package.owner} onChange={ e => setowner(e.target.value)}/>
        <TextField id="filled-basic" label="NAS IP" variant="standard" defaultValue={props.package.nas_ip} onChange={ e => setnas(e.target.value)}/>
        </Typography>
        </CardContent>
        <CardActions>
        <Button size="small" onClick={() => submitedit(props.package.hostname,vowner, vip, vnas)}>Save</Button>
        </CardActions>
    </React.Fragment>
        }
      </Card>
    </Box>
  );
}