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
import {get_kvm_list,get_dut_list,get_dbg_list,get_kvm_detail,get_dut_detail,get_dbg_detail,get_kvm_map,get_dut_map,get_dbg_map,submitmapping,deletemapping} from "../functions/main.js"

export default function SelectLabels() {
  const [kvm, setkvm] = React.useState('');
  const [kvmlist, setkvmlist] = React.useState([]);
  const [dbg, setdbg] = React.useState('');
  const [dbglist, setdbglist] = React.useState([]);
  const [dut, setdut] = React.useState('');
  const [dutlist, setdutlist] = React.useState([]);
  const [kvmpackage,setkvmpackage] = React.useState({});
  const [dbgpackage,setdbgpackage] = React.useState({});
  const [dutpackage,setdutpackage] = React.useState({});
  const KVMhandleChange = async function (event) {
    // console.log(event.target.value)
    await setkvm(event.target.value)
    if(dbg==='' && dut===''){
      get_kvm_map(event.target.value).then(res => {
        console.log(res.data)
        if(res.data.dbghost_ip!==""){
          setdbg(res.data.dbghost_ip)
          get_dbg_detail(res.data.dbghost_ip).then(res => {
            console.log(res.data)
            setdbgpackage(res.data)
          })
        }
        if(res.data.dut_machine!==""){
          setdut(res.data.dut_machine)
          get_dut_detail(res.data.dut_machine).then(res => {
            console.log(res.data)
            setdutpackage(res.data)
          })
        }
      })
    }
    get_kvm_detail(event.target.value).then(res => {
      console.log(res.data)
      setkvmpackage(res.data)
    })
  };
  const DBGhandleChange = (event) => {
    setdbg(event.target.value);
    if(kvm==='' && dut===''){
      get_dbg_map(event.target.value).then(res => {
        console.log(res.data)
        if(res.data.kvm_hostname!==""){
          setkvm(res.data.kvm_hostname)
          get_kvm_detail(res.data.kvm_hostname).then(res => {
            console.log(res.data)
            setkvmpackage(res.data)
          })
        }
        if(res.data.dut_machine!==""){
          setdut(res.data.dut_machine)
          get_dut_detail(res.data.dut_machine).then(res => {
            console.log(res.data)
            setdutpackage(res.data)
          })
        }
      })
    }
    get_dbg_detail(event.target.value).then(res => {
      console.log(res.data)
      setdbgpackage(res.data)
    })
  };
  const DUThandleChange = (event) => {
    setdut(event.target.value);
    if(kvm==='' && dbg===''){
      get_dut_map(event.target.value).then(res => {
        console.log(res.data)
        if(res.data.kvm_hostname!==""){
          setkvm(res.data.kvm_hostname)
          get_kvm_detail(res.data.kvm_hostname).then(res => {
            console.log(res.data)
            setkvmpackage(res.data)
          })
        }
        if(res.data.dbghost_ip!==""){ 
          setdbg(res.data.dbghost_ip)
          get_dbg_detail(res.data.dbghost_ip).then(res => {
            console.log(res.data)
            setdbgpackage(res.data)
          })
        }
      })        
    }
    get_dut_detail(event.target.value).then(res => {
      console.log(res.data)
      setdutpackage(res.data)
    })
  };
  const commitclick = (event) => {
    submitmapping(kvm,dbg,dut)
  };
  const deleteclick = async () => {
    const ans = deletemapping(kvm)
    if(ans){
      setkvm('')
      setdut('')
      setdbg('')
    }

  }
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
              return <MenuItem value={object}>{object}</MenuItem>;
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
              return <MenuItem value={object}>{object}</MenuItem>;
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
              return <MenuItem value={object}>{object}</MenuItem>;
            })
          }
        </Select>
      </FormControl>
      <FormControl sx={{ m: 2, minWidth: 30 }}>
        {(kvm != '' && dut != '' && dbg != '')?<Button onClick={deleteclick}>delete</Button>:<Button disabled>delete</Button>}
      </FormControl>
      <FormControl sx={{ m: 2, minWidth: 30 }}>
        <Button variant="contained" onClick={commitclick}>commit</Button>
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