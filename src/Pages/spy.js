import * as React from 'react';
import { get_ptoject_list, get_project_dut,get_kvm_status,unlock_screen,lock_screen, cutURLTail } from "../functions/main.js"
import {useParams} from "react-router-dom";
import "./styles.css";
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import IconButton from '@mui/material/IconButton';  
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import EditIcon from '@mui/icons-material/Edit';
import BackspaceIcon from '@mui/icons-material/Backspace';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import Modal from '@mui/material/Modal';

export default function Spy() {
    const removetag = () =>{
        settagged(false)
    }
    const addtag = () =>{
        settagged(true)
    }
    const setAIpic = () =>{
        setAIstatus(!AIstatus)
    }
    const [open, setOpen] = React.useState(false);
    const [index, setindex] = React.useState(0);
    const [isvalid, setisvalid] = React.useState(false);
    const [Locked, setLocked] = React.useState([]);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleClose2 = async () => {
        setOpen(false);
        const st = await get_kvm_status(all_kvm_host[index]);
        console.log(st.data)
        setdut_link(dut_link => [...dut_link, all_dut_link[index]])
        setkvm_host(kvm_host => [...kvm_host, all_kvm_host[index]])
        setkvm_status(kvm_status => [...kvm_status, st.data.stream_status])
    };
    const kvmnamecheck = (e) => {
        const isincluded = all_kvm_host.includes(e.target.value)
        console.log(isincluded)
        console.log(e.target.value)
        setisvalid(isincluded)
        if(isincluded){
            setindex(all_kvm_host.indexOf(e.target.value))
        }
    };
    const errorimage = (error) => {
        error.target.src = "error_pic.png";
    };
    const [kvm_host, setkvm_host] = React.useState([]);
    const [dut_name, setdut_name] = React.useState([]);
    const [kvm_status, setkvm_status] = React.useState([]);
    const [all_kvm_host, setall_kvm_host] = React.useState([]);
    const [random, setrandom] = React.useState(0);
    const [all_dut_link, setall_dut_link] = React.useState([]);
    const [dut_link, setdut_link] = React.useState([]);
    const {project} =useParams();
    const [tagged, settagged] = React.useState(true);
    const [AIstatus, setAIstatus] = React.useState(true);
    const [openmodal, setopenmodal] = React.useState(false);
    const [zoomtarget, setzoomtarget] = React.useState(0);
    const actions = [
        { icon: <BackspaceIcon />, name: 'remove all tag', function: removetag },
        { icon: <AddCircleOutlineIcon />, name: 'add all tag', function: addtag },
        { icon: <CameraswitchIcon />, name: 'Switch between AI and non AI', function: setAIpic},
        { icon: <EditIcon />, name: 'Edit', function: handleClickOpen },
      ];

    React.useEffect(()=>{
        const interval = setInterval(() => {
            setrandom(random => random+1)
            // console.log(random)
          }, 1000);

          return () => clearInterval(interval);
    }, 1000);
    const viewpopout = (url)=> {
        window.open(url, "_blank", "noreferrer");
      }
    const lockmachine = (index)=> {
        Locked[index] = true
        setLocked(Locked)
        lock_screen(dut_name[index])
    }
    const unlockmachine = (index)=> {
        Locked[index] = false
        setLocked(Locked)
        unlock_screen(dut_name[index])
    }
    const zoommachine = (index)=> {
        setzoomtarget(index)
        setopenmodal(true)
    }
    const handleModalClose =()=>{
        setopenmodal(false)
        setzoomtarget(0)
    }
    const deletemachine = (index)=> {
        setkvm_host(
            oldValues =>{
                return oldValues.filter((_, i) => i !== index)
            }
        )
        setdut_link(
            oldValues =>{
                return oldValues.filter((_, i) => i !== index)
            }
        )
        setkvm_status(
            oldValues =>{
                return oldValues.filter((_, i) => i !== index)
            }
        )
        setLocked(
            oldValues =>{
                return oldValues.filter((_, i) => i !== index)
            }
        )
    }
    React.useEffect(()=>{
        get_project_dut(project).then(res => {
            console.log(res.data)
            res.data.duts.map(async function (dut,i){
                setdut_link(dut_link => [...dut_link, dut.stream_url])
                setdut_name(dut_name => [...dut_name, dut.machine_name])
                setkvm_host(kvm_host => [...kvm_host, dut.hostname])
                setkvm_status(kvm_status => [...kvm_status,dut.record_status])
                if (dut.lock_coord===""){
                    setLocked(Locked => [...Locked,false])
                }else{
                    setLocked(Locked => [...Locked, true])
                }
            })
          })
        // maintain the complete list for adding machine
        get_project_dut("ALL").then(res => {
            res.data.duts.map(async function (dut,i){
                setall_dut_link(all_dut_link => [...all_dut_link, dut.stream_url])
                setall_kvm_host(all_kvm_host => [...all_kvm_host, dut.hostname])
            })
          })
    }, []);
    return (
        <div>
             <Modal open={openmodal} onClose={handleModalClose}>
             <div style={{ position: 'absolute', top: '50%', left: '30%', transform: 'translate(-50%, -50%)' }}>
                {
                    Locked[zoomtarget] == true?
                    <IconButton aria-label="lock" className='cancel-button-on-image'onClick={()=>unlockmachine(zoomtarget)}>
                    <LockIcon />
                    </IconButton>:
                    <IconButton aria-label="unlock" className='cancel-button-on-image'onClick={()=>lockmachine(zoomtarget)}>
                    <LockOpenIcon />
                    </IconButton>
                }
                    <img src={"https://10.227.106.11:8000/image/"+kvm_host[zoomtarget]+"/result_low.png?random="+random }alt="Clipped Image" style={{ minWidth: '300%', minHeight: '300%' }} />
                </div>
            </Modal>
            <div className="row justify-content-center">
            {kvm_host.map((kvm_host,i) => (
                <div className="image-box row ">
                {
                    kvm_status[i] == "recording"?
                    <img onError={errorimage}
                    src={AIstatus==true? "https://10.227.106.11:8000/image/"+kvm_host+"/result_low.png?random="+random+i : "https://10.227.106.11:8000/image/"+kvm_host+"/"+kvm_host+"_low.png?random="+random+i} className='spy-pic' />
                    :
                    <img src="https://10.227.106.11:8000/image/discon.png" className='spy-pic' />
                }
                
                <div className="row justify-content-center">
                    {
                        tagged == true? <div>
                        <Button variant="" size="small" className='button-on-image' onClick={()=>viewpopout(dut_link[i])}>
                        {dut_name[i]}
                        </Button>
                        <IconButton aria-label="delete" className='cancel-button-on-image'onClick={()=>deletemachine(i)}>
                        <DeleteIcon />
                        </IconButton>
                        {
                        Locked[i] == true?
                        <IconButton aria-label="lock" className='cancel-button-on-image'onClick={()=>unlockmachine(i)}>
                        <LockIcon />
                        </IconButton>:
                        <IconButton aria-label="unlock" className='cancel-button-on-image'onClick={()=>lockmachine(i)}>
                        <LockOpenIcon />
                        </IconButton>
                        }
                        <IconButton aria-label="zoom" className='cancel-button-on-image'onClick={()=>zoommachine(i)}>
                        < ZoomOutMapIcon />
                        </IconButton>
                        </div>: <div></div>
                    }
                    {/* <Button variant="" size="small" className='button-on-image' onClick={()=>viewpopout(dut_link[i])}>
                    {kvm_host}
                    </Button>
                    <IconButton aria-label="delete" className='cancel-button-on-image'onClick={()=>deletemachine(i)}>
                    <DeleteIcon />
                    </IconButton> */}
                </div>
                {/* {
                    tagged == true? <Link href={dut_link[0]} className='txt-on-image'>{kvm_host}</Link>:<div></div>
                } */}
                </div>
            ))}
        </div>
        <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
    >
        {actions.map((action) => (
        <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.function}
        />
        ))}
    </SpeedDial>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add machine</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add machine to this website, please enter the KVM name here. For example 18F_AI06 is a legal name.
          </DialogContentText>
          <TextField
            error={!isvalid}
            autoFocus
            margin="dense"
            id="name"
            label="KVM name"
            type="email"
            fullWidth
            variant="standard"
            onChange={kvmnamecheck}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose2} disabled = {!isvalid}>Submit</Button>
        </DialogActions>
      </Dialog>
        </div>
    )
}