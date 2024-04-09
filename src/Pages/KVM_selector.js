import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import { lightGreen,grey } from '@mui/material/colors';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import ComputerIcon from '@mui/icons-material/Computer';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import "./styles.css";
import MailIcon from '@mui/icons-material/Mail';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddLinkIcon from '@mui/icons-material/AddLink';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import Badge from '@mui/material/Badge';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {submitmapping,Delete_kvm_message,get_kvm_message,Insert_kvm_message,get_hostnames_by_floor,get_freedut_list,get_freedbh_list,get_floors,get_kvm_detail,get_dut_detail,get_dbg_detail,get_kvm_map,get_dut_map,get_dbg_map,deletemapping} from "../functions/main.js"
import { CenterFocusStrong } from '@mui/icons-material';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@mui/material/colors';
import InfoIcon from '@mui/icons-material/Info';
import InboxIcon from '@mui/icons-material/Inbox';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
const useStyles = makeStyles((theme) => ({
  iconButton: {
    // Define your base styles
  },
  iconButtonHover: {
    '&:hover': {
      // Define styles for hover state
    },
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function SelectLabels() {
  const classes = useStyles();
  const [kvm, setkvm] = React.useState('');
  const [floors, setfloors] = React.useState([]);
  const [messagecount, setmessagecount] = React.useState([2]);
  const [islinked, setislinked] = React.useState([true]);
  const [floors_amount, setfloors_amount] = React.useState([]);
  const [floor, setfloor] = React.useState('');
  const [kvmlist, setkvmlist] = React.useState([]);
  const [dbh, setdbh] = React.useState('');
  const [dbhlist, setdbhlist] = React.useState([]);
  const [dut, setdut] = React.useState('');
  const [dutlist, setdutlist] = React.useState([]);
  const [kvmpackage,setkvmpackage] = React.useState({});
  const [dbgpackage,setdbgpackage] = React.useState({});
  const [dutpackage,setdutpackage] = React.useState({});
  const [message_target, setmessage_target] = React.useState();
  const [delete_target, setdelete_target] = React.useState();
  const [add_target, setadd_target] = React.useState();
  const [info_target, setinfo_target] = React.useState();
  const [messages, setmessages] = React.useState([]);
  const [cards, setcards] = React.useState([1]);
  const [openDialog, setopenDialog] = React.useState(false);
  const [islinkHovered, setlinkIsHovered] = useState([]);
  const [addmessage, setaddmessage] = useState("");
  const [opendeletedialog, setopendeletedialog] = useState(false)
  const [openadddialog, setopenadddialog] = useState(false)
  const [opendetaildialog, setopendetaildialog] = useState(false)
  const [mappingkvm, setmappingkvm] = useState("")
  const [mappingdbh, setmappingdbh] = useState("")
  const [mappingdut, setmappingdut] = useState("")
  const FloorhandleChange = async function (event) {
    // console.log(event.target.value)
    await setfloor(event.target.value)
    get_hostnames_by_floor(event.target.value).then(res => {
      setkvmlist(res.data.hostnames)
      setcards(res.data.hostnames)
      setislinked(res.data.islinked)
      setmessagecount(res.data.messagecount)
    })
  };
  const handleMouseEnterlink = (index) => {
    const updatedHoverState = [...islinkHovered];
    updatedHoverState[index] = true;
    setlinkIsHovered(updatedHoverState);
  };
  const reloadkvminfo = () => {
    get_hostnames_by_floor(floor).then(res => {
      setkvmlist(res.data.hostnames)
      setcards(res.data.hostnames)
      setislinked(res.data.islinked)
      setmessagecount(res.data.messagecount)
    })
  }
  const reloadMessage = (hostname) => {
    get_kvm_message(hostname).then(res=>{
      setmessages(res.data.message)
    })
    reloadkvminfo()
  }
  const handleMouseLeavelink = (index) => {
    const updatedHoverState = [...islinkHovered];
    updatedHoverState[index] = false;
    setlinkIsHovered(updatedHoverState);
  };
  const handleMessageboxOpen = (hostname) => {
    setopenDialog(true)
    setmessage_target(hostname)
    reloadMessage(hostname)

  };
  const handleChipDelete = (index) => {
    Delete_kvm_message(message_target, messages[index]).then(res=> {
      if(res.status===200){
        console.log("enter")
        reloadMessage(message_target)
      }else{

      }
    })
  };
  const handledelete = (hostname) =>{
    deletemapping(hostname).then(res =>{
      reloadkvminfo()
    })
    handleClosedeletedialog()
  }
  const handledisconnect = (index) =>{
    setopendeletedialog(true)
    setdelete_target(kvmlist[index])
  }
  const handleNewconnect = (index) => {
    setopenadddialog(true)
    setadd_target(kvmlist[index])
    get_freedut_list().then(res =>{
      setdut(res.data.machines)
    })
    get_freedbh_list().then(res =>{
      setdbh(res.data.ips)
    })
  }
  const handleClosedeletedialog = () =>{
    setopendeletedialog(false)
  }
  const handleMessageboxadd = (hostname) => {
    Insert_kvm_message(hostname, addmessage).then(res=> {
      if(res.status===200){
        reloadMessage(hostname)
        setaddmessage("")
      }else{

      }
    })
  }
  const handleaddmessage = (event) => {
    setaddmessage(event.target.value)
  }
  const handleMessageboxClose = () => {
    setopenDialog(false)
    setmessage_target("")
    setaddmessage("")
  };
  const handleClosedetaildialog = () =>{
    setopendetaildialog(false)
  }
  const handleCloseadddialog = () =>{
    setopenadddialog(false)
  }
  const dbhhandleChange = (event) => {
    setdbh(event.target.value)
  }
  const duthandleChange = (event) => {
    setdut(event.target.value)
  }
  const handleinfoopen = (i) =>{
    setopendetaildialog(true)
    setinfo_target(kvmlist[i])
    setmappingkvm(kvmlist[i])
    get_kvm_map(kvmlist[i]).then(res =>{
      console.log(res)
      setmappingdbh(res.data.dbghost_ip)
      setmappingdut(res.data.dut_machine)
    })
  }
  React.useEffect(() => {
    get_floors().then(res => {
      setfloors(res.data.floor)
      setfloors_amount(res.data.amount)
    })
  },[]);
  return (
    <div className='page_grid'>
      {/* <Alert severity="success">This is a success Alert.</Alert> */}
      <FormControl sx={{ m: 1, minWidth: 240 }}>
        <InputLabel id="demo-simple-select-helper-label">Area</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          value={floor}
          label="Floor"
          onChange={FloorhandleChange}
        >
          {
            floors.map(function(object,i){
              return <MenuItem value={object}>{object} (KVMs: {floors_amount[i]})</MenuItem>;
            })
          }
        </Select>
        {/* <FormHelperText>With label + helper text</FormHelperText> */}
      </FormControl>
      <Container sx={{ mt: 5, }}>
        {
          floor===''? 
          <Grid container spacing={3}>
            <Grid item  xs={12} sm={6} md={12}>
              <Typography gutterBottom variant="h5" component="h2">
                Select Your KVM Region First ...
              </Typography>
            </Grid>
            <Grid item  xs={12} sm={6} md={3}> 
              <Stack spacing={1}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={210} height={60} />
                <Skeleton variant="rounded" width={210} height={60} />
              </Stack>
            </Grid>
            <Grid item  xs={12} sm={6} md={3}>
              <Stack spacing={1}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={210} height={60} />
                <Skeleton variant="rounded" width={210} height={60} />
              </Stack>
            </Grid>
            <Grid item  xs={12} sm={6} md={3}> 
              <Stack spacing={1}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={210} height={60} />
                <Skeleton variant="rounded" width={210} height={60} />
              </Stack>
            </Grid>
            <Grid item  xs={12} sm={6} md={3}>
              <Stack spacing={1}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={210} height={60} />
                <Skeleton variant="rounded" width={210} height={60} />
              </Stack>
            </Grid>
            <Grid item  xs={12} sm={6} md={3}> 
              <Stack spacing={1}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={210} height={60} />
                <Skeleton variant="rounded" width={210} height={60} />
              </Stack>
            </Grid>
            <Grid item  xs={12} sm={6} md={3}>
              <Stack spacing={1}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={210} height={60} />
                <Skeleton variant="rounded" width={210} height={60} />
              </Stack>
            </Grid>
            <Grid item  xs={12} sm={6} md={3}> 
              <Stack spacing={1}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={210} height={60} />
                <Skeleton variant="rounded" width={210} height={60} />
              </Stack>
            </Grid>
            <Grid item  xs={12} sm={6} md={3}>
              <Stack spacing={1}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={210} height={60} />
                <Skeleton variant="rounded" width={210} height={60} />
              </Stack>
            </Grid>
            <Grid item  xs={12} sm={6} md={3}> 
              <Stack spacing={1}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={210} height={60} />
                <Skeleton variant="rounded" width={210} height={60} />
              </Stack>
            </Grid>
            <Grid item  xs={12} sm={6} md={3}>
              <Stack spacing={1}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={210} height={60} />
                <Skeleton variant="rounded" width={210} height={60} />
              </Stack>
            </Grid>
            <Grid item  xs={12} sm={6} md={3}> 
              <Stack spacing={1}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={210} height={60} />
                <Skeleton variant="rounded" width={210} height={60} />
              </Stack>
            </Grid>
            <Grid item  xs={12} sm={6} md={3}>
              <Stack spacing={1}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={210} height={60} />
                <Skeleton variant="rounded" width={210} height={60} />
              </Stack>
            </Grid>
          </Grid>
          
        :
        <Grid container spacing={4}>
        {cards.map((card,i) => (
          <Grid item key={card} xs={12} sm={6} md={2.4}>
            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <CardContent sx={{ flexGrow: 1, padding_bottom: 0 }}>
                <Typography  variant="h5" component="h2">
                  {kvmlist[i]}
                </Typography>
              </CardContent>
              <CardActions>
              <CardContent sx={{ flexGrow: 1, padding: 0, padding_bottom: 0 }}>
              <IconButton >
                <Badge badgeContent={messagecount[i]} color="primary" >
                  <InboxIcon onClick={() => handleMessageboxOpen(kvmlist[i])}/>
                </Badge>
              </IconButton>
              {
                islinked[i]? 
                <IconButton className={`${classes.iconButton} ${islinkHovered[i] ? classes.iconButtonHover : ''}`} onMouseEnter={() => handleMouseEnterlink(i)} onMouseLeave={ () => handleMouseLeavelink(i)} onClick={()=> handledisconnect(i)}>
                {
                  islinkHovered[i]? <LinkOffIcon fontSize="large"/> : <InsertLinkIcon sx={{ color: green[400] }} fontSize="large"/>
                }
              </IconButton> :
              <IconButton className={`${classes.iconButton} ${islinkHovered[i] ? classes.iconButtonHover : ''}`} onMouseEnter={() => handleMouseEnterlink(i)} onMouseLeave={ () => handleMouseLeavelink(i)} onClick={()=> handleNewconnect(i)}>
              {
                islinkHovered[i]? <AddLinkIcon fontSize="large"/> : <InsertLinkIcon fontSize="large"/>
              }
            </IconButton>
              }
              <IconButton >
                <Badge color="primary" >
                  <InfoIcon onClick={() => handleinfoopen(i)}/>
                </Badge>
              </IconButton>
              </CardContent>
              </CardActions>
              
            </Card>
          </Grid>
        ))}
      </Grid>
        }
      </Container>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleMessageboxClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Message of {message_target}</DialogTitle>
        <DialogContent >
        {messages.map((message,i) => (
          <Chip label={message} variant="outlined" onDelete={()=>handleChipDelete(i)} />
        ))}
        </DialogContent>
        <DialogContent>
        <TextField label="Add new Message" variant="standard" value={addmessage} onChange={handleaddmessage}/>
          {/* <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleMessageboxadd(message_target)}>ADD</Button>
          {/* <Button onClick={handleMessageboxClose}>Agree</Button> */}
        </DialogActions>
      </Dialog>
      <Dialog
        open={opendeletedialog}
        onClose={handleClosedeletedialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"You Sure You want to delete this pairing?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you don't know what this means, please click No to leave it. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosedeletedialog} autoFocus>No</Button>
          <Button onClick={()=>handledelete(delete_target)}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={opendetaildialog}
        onClose={handleClosedetaildialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Mapping of {info_target}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1} sx={{ mt: 1, minWidth: 500 , padding: 0}}>
            <Grid item xs={12} sm={6} md={4}>
            <Stack spacing={1}>
              <Fab variant="extended" color="primary" size="small">
                <NavigationIcon sx={{ mr: 1 }} />
                KVM
              </Fab>
              <Fab variant="extended">
                {/* <NavigationIcon sx={{ mr: 1 }} /> */}
                {mappingkvm}
              </Fab>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
            <Stack spacing={1}>
              <Fab variant="extended" color="primary" size="small">
                <NavigationIcon sx={{ mr: 1 }} />
                DBH
              </Fab>
              <Fab variant="extended">
                {/* <NavigationIcon sx={{ mr: 1 }} /> */}
                {mappingdbh}
              </Fab>
            </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
            <Stack spacing={1}>
              <Fab variant="extended" color="primary" size="small">
                <NavigationIcon sx={{ mr: 1 }} />
                DUT
              </Fab>
              <Fab variant="extended">
                {/* <NavigationIcon sx={{ mr: 1 }} /> */}
                {mappingdut}
              </Fab>
            </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosedetaildialog} autoFocus>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openadddialog}
        onClose={handleCloseadddialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Adding mapping of {add_target}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1} sx={{ mt: 1, minWidth: 500 , padding: 0}}>
            <Grid item xs={12} sm={6} md={4}>
            <Stack spacing={1}>
              <Fab variant="extended" color="primary" size="small">
                <NavigationIcon sx={{ mr: 1 }} />
                KVM
              </Fab>
              <Fab variant="extended">
                {/* <NavigationIcon sx={{ mr: 1 }} /> */}
                {add_target}
              </Fab>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
            <Stack spacing={1}>
              <Fab variant="extended" color="primary" size="small">
                <NavigationIcon sx={{ mr: 1 }} />
                DBH
              </Fab>
                <Select
                  multiple
                  displayEmpty
                  value={dbh}
                  onChange={dbhhandleChange}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>DBH</em>;
                    }
        
                    return selected.join(', ');
                  }}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  {
                    dbhlist.map(function(object,i){
                      return <MenuItem value={object}>{object}</MenuItem>;
                    })
                  }
                </Select>
            </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
            <Stack spacing={1}>
              <Fab variant="extended" color="primary" size="small">
                <NavigationIcon sx={{ mr: 1 }} />
                DUT
              </Fab>
              <Select
                  multiple
                  displayEmpty
                  value={dut}
                  onChange={duthandleChange}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>DUT</em>;
                    }
        
                    return selected.join(', ');
                  }}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  {
                    dutlist.map(function(object,i){
                      return <MenuItem value={object}>{object}</MenuItem>;
                    })
                  }
                </Select>
            </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseadddialog} autoFocus>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}