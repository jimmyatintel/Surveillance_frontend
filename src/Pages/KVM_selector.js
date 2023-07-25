import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import { lightGreen,grey } from '@mui/material/colors';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import ComputerIcon from '@mui/icons-material/Computer';
import Grid from '@mui/material/Grid';
import KvmCard from './kvmcard.js';
import DbgCard from './dbgcard.js';
import DutCard from './dutcard.js';
import Button from '@mui/material/Button';
import {get_kvm_list,get_dut_list,get_dbg_list,get_kvm_detail} from "../functions/main.js"

export default function SelectLabels() {
  const [kvm, setkvm] = React.useState('');
  const [kvmlist, setkvmlist] = React.useState([]);
  const [dbg, setdbg] = React.useState('');
  const [dbglist, setdbglist] = React.useState([]);
  const [dut, setdut] = React.useState('');
  const [dutlist, setdutlist] = React.useState([]);
  const [kvmpackage,setkvmpackage] = React.useState({});
  const KVMhandleChange = (event) => {
    setkvm(event.target.value).then(
      get_kvm_detail().then(res => {
        setkvmpackage(res.data)
      })
    );
  };
  const DBGhandleChange = (event) => {
    setdbg(event.target.value);
  };
  const DUThandleChange = (event) => {
    setdut(event.target.value);
  };
  React.useEffect(() => {
    get_kvm_list().then(res => {
      setkvmlist(res.data.hostnames)
    })
    get_dut_list().then(res => {
      setdutlist(res.data.machines)
    })
    get_dbg_list().then(res => {
      setdbglist(res.data.ips)
    })
  },[]);
  const dutpackage = {
    machine_name: 'Willi01',
    ssim: '100',
    status: 'idle'
  }
  const dbgpackage = {
    hostname: 'twndbg1',
    ip: '127.0.0.1',
    owner: 'Jimmy'
  }
  // const kvmpackage = {
  //   hostname: '18F_AI01',
  //   ip: '127.0.0.1',
  //   owner: 'Jimmy',
  //   status: 'idle',
  //   version: '1.0.0',
  //   nasip: '127.0.0.1',
  //   streamurl: 'http://test.com',
  //   streamstatus: 'idle'
  // }
  return (
    <div className='page_grid'>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">KVM</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          value={kvm}
          label="KVM"
          onChange={KVMhandleChange}
        >
          <MenuItem value="" >
            <em>None</em>
          </MenuItem>{
            kvmlist.map(function(object,i){
              return <MenuItem value={i}>{object}</MenuItem>;
            })
          }
        </Select>
        {/* <FormHelperText>With label + helper text</FormHelperText> */}
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 180 }}>
        <InputLabel id="demo-simple-select-helper-label">Debug Host</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          value={dbg}
          label="Debug Host"
          onChange={DBGhandleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>{
            dbglist.map(function(object,i){
              return <MenuItem value={i}>{object}</MenuItem>;
            })
          }
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 180 }}>
        <InputLabel id="demo-simple-select-helper-label">DUT Name</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          value={dut}
          onChange={DUThandleChange}
          label="DUT Name"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>{
            dutlist.map(function(object,i){
              return <MenuItem value={i}>{object}</MenuItem>;
            })
          }
        </Select>
      </FormControl>
      <FormControl sx={{ m: 2, minWidth: 30 }}>
        {(kvm != '' && dut != '' && dbg != '')?<Button>delete</Button>:<Button disabled>delete</Button>}
      </FormControl>
      <FormControl sx={{ m: 2, minWidth: 30 }}>
        <Button variant="contained" >commit</Button>
      </FormControl>
      
      <Grid container sx={{ color: 'text.primary' }}>
        <Grid item xs={3}>
          <KeyboardIcon sx={{fontSize: 80, color: (kvm != '')? lightGreen["A700"]:grey }}></KeyboardIcon>
          {
            (kvm != '')? <KvmCard package={kvmpackage}></KvmCard> : <div></div>
          }
        </Grid>
        <Grid item xs={3}>
          <SettingsEthernetIcon fontSize="large" sx={{fontSize: 80, color: (dbg != '')? lightGreen["A700"]:grey }}></SettingsEthernetIcon>
          {
             (dbg != '')? <DbgCard package={dbgpackage}></DbgCard> : <div></div>
          }
          
        </Grid>
        <Grid item xs={3}>
          <ComputerIcon fontSize="large" sx={{fontSize: 80, color: (dut != '')? lightGreen["A700"]:grey  }}></ComputerIcon>
          {
             (dut != '')? <DutCard package={dutpackage}></DutCard> : <div></div>
          }
        </Grid>
      </Grid>
    </div>
  );
}