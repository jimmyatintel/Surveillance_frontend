import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/Camera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import PreviewIcon from '@mui/icons-material/Preview';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import HistoryIcon from '@mui/icons-material/History';
import AirplayIcon from '@mui/icons-material/Airplay';
import ArticleIcon from '@mui/icons-material/Article';
// import CameraIcon from '@mui/icons-material/Camera';
import CastConnectedIcon from '@mui/icons-material/CastConnected';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { cutURLhead,getVNClink,get_ptoject_list, get_project_unit, project_start, project_stop, cutURLTail } from "../functions/main.js"

function DUT_Status(dut_status,kvm_status){
  if (kvm_status=="error"){
    return "Unknown"
  }
  if(dut_status==0){
    return "BSOD"
  }
  if(dut_status==1){
    return "Black"
  }
  if(dut_status==2){
    return "Restart"
  }
  if(dut_status==3){
    return "Normal"
  }
  return "Unknown"
}
const errorimage = (error) => {
  error.target.src = "error_pic.png";
};
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
export default function Monitor() {
  const [project, setproject] = React.useState('');
  const [project_list, setproject_list] = React.useState(["ALL"]);
  const [dut_link, setdut_link] = React.useState([]);
  const [dut, setdut] = React.useState([]);
  const [dbg_link, setdbg_link] = React.useState([]);
  const [dut_status, setdut_status] = React.useState([]);
  const [dut_name, setdut_name] = React.useState([]);
  const [kvm_host, setkvm_host] = React.useState([]);
  const [cards, setcards] = React.useState([]);
  const [record_status, setrecord_status] = React.useState([]);
  const handlestart = ()=> {
    project_start(project)
  }
  const handlestop = ()=> {
    project_stop(project)
  }
  const handleprojectChange = async (event) => {
      setdut_link([])
      setdut_status([])
      setdut([])
      setdut_name([])
      setkvm_host([])
      setcards([])
      setrecord_status([])
      setdbg_link([])
      setproject(event.target.value);
      get_project_unit(event.target.value).then(res => {
        console.log(1)
        console.log(res.data)
        res.data.duts.map(async function (dut,i){
          setcards(cards => [...cards, i])
          setdut_name(dut_name => [...dut_name, dut.machine_name])
          setdut_link(dut_link => [...dut_link, dut.stream_url])
          setdut_status(dut_status => [...dut_status, dut.status])
          setkvm_host(kvm_host => [...kvm_host, dut.hostname])
          setrecord_status(record_status => [...record_status, dut.record_status])
          setdbg_link(dbg_link => [...dbg_link, dut.debug_host])
        })
      })
    };
  const viewpopout = (url)=> {
    window.open(url, "_blank", "noreferrer");
  }
  React.useEffect(() => {
    get_ptoject_list().then( res => {
      res.data.projects.map(function (pro){
        setproject_list(project_list => [...project_list, pro])
      })
    })
  }, [])
  React.useEffect(() => {
    if (project!==''){
      console.log(project)
      get_project_unit(project).then(res => {
        setdut_link([])
        setdut_status([])
        setdut_name([])
        setkvm_host([])
        setcards([])
        setrecord_status([])
        res.data.duts.map(async function (dut,i){
          setcards(cards => [...cards, i])
          setdut_name(dut_name => [...dut_name, dut.machine_name])
          setdut_link(dut_link => [...dut_link, dut.stream_url])
          setdut_status(dut_status => [...dut_status, dut.status])
          setkvm_host(kvm_host => [...kvm_host, dut.hostname])
          setrecord_status(record_status => [...record_status, dut.record_status])
        })
      })
    }
    }, [project]);
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Control Center
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Here you can see all machines status.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Search by project...</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={project}
                    label="Search by project..."
                    onChange={handleprojectChange}
                >
                    {
                        project_list.map(function(object,i){
                            return <MenuItem value={object}>{object}</MenuItem>;
                        })
                    }
                </Select>
              </FormControl>
            </Stack>
          </Container>
        </Box>
        {
          project===''?<div></div>:
          project==="ALL"?
          <div>
            <Button variant="contained" sx={{marginLeft: 2, marginRight: 2}} href ={"/spy/"+project}>AI &nbsp;<CameraIcon/></Button>
          </div>
          :<div>
            <Button variant="contained" sx={{marginLeft: 2, marginRight: 2}} onClick={handlestart}>Start</Button>
            <Button variant="contained" sx={{marginLeft: 2, marginRight: 2}} onClick={handlestop}>Stop</Button>
            <Button variant="contained" sx={{marginLeft: 2, marginRight: 2}} href ={"/setting/"+project}>Setting</Button>
            <Button variant="contained" sx={{marginLeft: 2, marginRight: 2}} href ={"/spy/"+project}>AI &nbsp;<CameraIcon/></Button>
          </div>
        }
        
        {/* <Button variant="contained" sx={{marginLeft: 5, marginRight: 5}}>Reset</Button> */}
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card,i) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={"https://10.227.106.11:8000/image/"+kvm_host[i]+"/"+"cover.png"}
                    onError={e => {

                      e.target.src = "error_pic.png";
                    }}
                    loading="lazy"
                    //image="http://10.227.106.11:8000/image/jimmytesting/jimmytesting.png"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {dut_name[i]}
                    </Typography>
                    <Typography>
                      DUT: {DUT_Status(dut_status[i],record_status[i])}
                    </Typography>
                    <Typography>
                      LF: --:--:--
                    </Typography>
                    <Typography>
                      KVM: {record_status[i]}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{display: 'flex'}}>
                    <Tooltip title="View Machine" sx={{flex: 1}}>
                      <IconButton onClick={()=>viewpopout(dut_link[i])}>
                        <PreviewIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Time Machine" sx={{flex: 1}}>
                      <IconButton   href ={"/player/"+kvm_host[i]}>
                        <HistoryIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="KVM Page" sx={{flex: 1}}>
                      <IconButton   onClick={()=>viewpopout(cutURLTail(dut_link[i]))}>
                        <AirplayIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="VNC Page" sx={{flex: 1}}>
                      <IconButton   onClick={()=>viewpopout(getVNClink(dbg_link[i]))}>
                        <CastConnectedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Error Log" sx={{flex: 1}}>
                      <IconButton  href ={"/faillog/"+dut_name[i]} >
                        <ArticleIcon />
                      </IconButton>
                    </Tooltip>
                    {/* <Button size="small" onClick={()=>viewpopout(dut_link[i])}>View</Button>
                    <Button size="small" href ={"/player/"+kvm_host[i]}>time machine</Button> */}
                    {/* <Button size="small" onClick={()=>viewpopout(cutURLTail(dut_link[i]))}>KVM</Button>                   */}
                    </CardActions>

                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      {/* <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </Box> */}
      {/* End footer */}
    </ThemeProvider>
  );
}