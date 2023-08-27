import * as React from 'react';
import { get_ptoject_list, get_project_dut } from "../functions/main.js"
import {useParams} from "react-router-dom";
import "./styles.css";
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';  
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import BackspaceIcon from '@mui/icons-material/Backspace';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Spy() {
    const removetag = () =>{
        settagged(false)
    }
    const addtag = () =>{
        settagged(true)
    }
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [kvm_host, setkvm_host] = React.useState([]);
    const [random, setrandom] = React.useState(0);
    const [dut_link, setdut_link] = React.useState([]);
    const {project} =useParams();
    const [tagged, settagged] = React.useState(true);
    const actions = [
        { icon: <BackspaceIcon />, name: 'remove all tag', function: removetag },
        { icon: <AddCircleOutlineIcon />, name: 'add all tag', function: addtag },
        { icon: <SaveIcon />, name: 'Save this combination' },
        { icon: <EditIcon />, name: 'Edit', function: handleClickOpen },
      ];
    React.useEffect(()=>{
        const interval = setInterval(() => {
            setrandom(random => random+1)
            console.log(random)
          }, 1000);
          return () => clearInterval(interval);
    }, 1000);
    const viewpopout = (url)=> {
        window.open(url, "_blank", "noreferrer");
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
    }
    React.useEffect(()=>{
        get_project_dut(project).then(res => {
            console.log(1)
            console.log(res.data)
            res.data.duts.map(async function (dut,i){
                setdut_link(dut_link => [...dut_link, dut.stream_url])
                setkvm_host(kvm_host => [...kvm_host, dut.hostname])
                for (let i = 0; i < 19; i++){
                    setdut_link(dut_link => [...dut_link, dut.stream_url])
                    setkvm_host(kvm_host => [...kvm_host, dut.hostname])
                }
            })
          })
    }, []);
    return (
        <div>
            <div className="row justify-content-center">
            {kvm_host.map((kvm_host,i) => (
                <div className="image-box row ">
                <img src={"http://10.227.106.11:8000/image/"+kvm_host+"/"+kvm_host+"_low.png?random="+random+i} className='spy-pic' />
                <div className="row justify-content-center">
                    {
                        tagged == true? <div><Button variant="" size="small" className='button-on-image' onClick={()=>viewpopout(dut_link[i])}>
                        {kvm_host}
                        </Button>
                        <IconButton aria-label="delete" className='cancel-button-on-image'onClick={()=>deletemachine(i)}>
                        <DeleteIcon />
                        </IconButton></div>: <div></div>
                    }
                    {/* <Button variant="" size="small" className='button-on-image' onClick={()=>viewpopout(dut_link[i])}>
                    {kvm_host}
                    </Button>
                    <IconButton aria-label="delete" className='cancel-button-on-image'onClick={()=>deletemachine(i)}>
                    <DeleteIcon />
                    </IconButton> */}
                </div>
                {
                    tagged == true? <Link href={dut_link[0]} className='txt-on-image'>{kvm_host}</Link>:<div></div>
                }
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
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
        </div>
    )
}