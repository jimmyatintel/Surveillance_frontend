import React from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { uploadfile } from "../functions/main.js" 
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
export default function Uploads() {
    const [dutfile, setdutfile] = React.useState('');
    const [kvmfile, setkvmfile] = React.useState('');
    const [dbgfile, setdbgfile] = React.useState('');
    const [mapfile, setmapfile] = React.useState('');
    const submitmapping = () => {
        uploadfile(dutfile,kvmfile,dbgfile,mapfile).catch(
            (reason)=> {
                console.log(reason.response.data)
                window.alert("Cross verification fail!\n Reason: " + reason.response.data)
            }
        )
    }
    const handlekvmclick = () => {
        document.getElementById('kvmfile').click()
    }
    const handledutclick = () => {
        document.getElementById('dutfile').click()
    }
    const handledbgclick = () => {
        document.getElementById('dbgfile').click()
    }
    const handlemapclick = () => {
        document.getElementById('mapfile').click()
    }
    const handlekvmfile = (event) => {
        console.log('kvm file uploaded')
        if(event.target.files[0]){
            setkvmfile(event.target.files[0])
        }
    }
    const handledutfile = (event) => {
        console.log('dut file uploaded')
        if(event.target.files[0]){
            // uploadfile(event.target.files[0]).then()4
            setdutfile(event.target.files[0])
        }
    }
    const handledbgfile = (event) => {
        console.log('dbg file uploaded')
        if(event.target.files[0]){
            // uploadfile(event.target.files[0]).then()
            setdbgfile(event.target.files[0])
        }
    }
    const handlemapfile = (event) => {
        console.log('map file uploaded')
        if(event.target.files[0]){
            // uploadfile(event.target.files[0]).then()
            setmapfile(event.target.files[0])
        }
    }
    return (
        <div>
            <FormControl sx={{ m: 2, minWidth: 30 }}>
                <Button variant="contained" onClick={handlekvmclick}>
                    KVM
                    <input id="kvmfile" type="file" hidden onChange={handlekvmfile}/>
                </Button>
                {
                    (kvmfile!='')? <Card variant="outlined">
                    <React.Fragment>
                        <CardContent>
                            <Typography variant="h5" component="div">
                            {kvmfile.name}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {/* {kvmfile.name} */}
                            </Typography>
                            <Typography variant="body2">
                                {/* ip: {props.package.ip}
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
                                <br /> */}
                            </Typography>
                        </CardContent>
                    </React.Fragment>
                </Card> : <div></div>
                }
            </FormControl>
            <FormControl sx={{ m: 2, minWidth: 30 }}>
                <Button variant="contained" onClick={handledutclick}>
                    DUT
                    <input id="dutfile" type="file" hidden onChange={handledutfile}/>
                </Button>
                {
                    (dutfile!='')? <Card variant="outlined">
                    <React.Fragment>
                        <CardContent>
                            <Typography variant="h5" component="div">
                            {dutfile.name}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {/* {kvmfile.name} */}
                            </Typography>
                            <Typography variant="body2">
                                {/* ip: {props.package.ip}
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
                                <br /> */}
                            </Typography>
                        </CardContent>
                    </React.Fragment>
                </Card> : <div></div>
                }
            </FormControl>
            <FormControl sx={{ m: 2, minWidth: 30 }}>
                <Button variant="contained" onClick={handledbgclick}>
                    DBG
                    <input id="dbgfile" type="file" hidden onChange={handledbgfile}/>
                </Button>
                {
                    (dbgfile!='')? <Card variant="outlined">
                    <React.Fragment>
                        <CardContent>
                            <Typography variant="h5" component="div">
                            {dbgfile.name}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {/* {kvmfile.name} */}
                            </Typography>
                            <Typography variant="body2">
                                {/* ip: {props.package.ip}
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
                                <br /> */}
                            </Typography>
                        </CardContent>
                    </React.Fragment>
                </Card> : <div></div>
                }
            </FormControl>
            <FormControl sx={{ m: 2, minWidth: 30 }}>
                <Button variant="contained" onClick={handlemapclick}>
                    mapping
                    <input id="mapfile" type="file" hidden onChange={handlemapfile}/>
                </Button>
                {
                    (mapfile!='')? <Card variant="outlined">
                    <React.Fragment>
                        <CardContent>
                            <Typography variant="h5" component="div">
                            {mapfile.name}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {/* {kvmfile.name} */}
                            </Typography>
                            <Typography variant="body2">
                                {/* ip: {props.package.ip}
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
                                <br /> */}
                            </Typography>
                        </CardContent>
                    </React.Fragment>
                </Card> : <div></div>
                }
            </FormControl>
            <FormControl sx={{ m: 2, minWidth: 30 }}>
                <Button variant="contained" onClick={submitmapping}>
                    Submit
                </Button>
            </FormControl>
        </div>
    )
}
        