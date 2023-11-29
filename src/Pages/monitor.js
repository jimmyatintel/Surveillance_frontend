import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { get_ptoject_list, get_project_dut, project_start, project_stop } from "../functions/main.js"

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function DUT_Status(dut_status){
  if(dut_status==1){
    return "Pending"
  }
  if(dut_status==0){
    return "Stop"
  }
  if(dut_status==2){
    return "Monitoring"
  }
  if(dut_status==3){
    return "Normal"
  }
  return "Unknown"
}
// function REC_Status(record_status){
//   if(record_status==1){
//     return "Pending"
//   }
//   if(record_status==0){
//     return "Stop"
//   }
//   if(record_status==2){
//     return "Monitoring"
//   }
//   if(record_status==3){
//     return "Normal"
//   }
//   return "Unknown"
// }
const errorimage = (error) => {
  error.target.src = "error_pic.png";
};
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
export default function Monitor() {
  const [project, setproject] = React.useState('');
  const [project_list, setproject_list] = React.useState(["ALL"]);
  const [dut_link, setdut_link] = React.useState([]);
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
      setdut_name([])
      setkvm_host([])
      setcards([])
      setrecord_status([])
      setproject(event.target.value);
      get_project_dut(event.target.value).then(res => {
        console.log(1)
        console.log(res.data)
        res.data.duts.map(async function (dut,i){
          setcards(cards => [...cards, i])
          setdut_name(dut_name => [...dut_name, dut.machine_name])
          setdut_link(dut_link => [...dut_link, dut.stream_url])
          setdut_status(dut_status => [...dut_status, dut.status])
          setkvm_host(kvm_host => [...kvm_host, dut.hostname])
          setrecord_status(record_status => [...record_status, dut.record_status])
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
    const interval = setInterval(() => {
      console.log(project)
      get_project_dut(project).then(res => {
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
    }, 5000);
    return () => clearInterval(interval); // Cleanup the interval on unmount
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
        <Button variant="contained" sx={{marginLeft: 5, marginRight: 5}} onClick={handlestart}>Start</Button>
        <Button variant="contained" sx={{marginLeft: 5, marginRight: 5}} onClick={handlestop}>Stop</Button>
        <Button variant="contained" sx={{marginLeft: 5, marginRight: 5}}>Reset</Button>
        <Button variant="contained" sx={{marginLeft: 5, marginRight: 5}} href ={"/spy/"+project}>Lyndon's function</Button>
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

                    //image="http://10.227.106.11:8000/image/jimmytesting/jimmytesting.png"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {dut_name[i]}
                    </Typography>
                    <Typography>
                      DUT: {DUT_Status(dut_status[i])}
                    </Typography>
                    <Typography>
                      KVM: {record_status[i]}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={()=>viewpopout(dut_link[i])}>View</Button>
                    <Button size="small" href ={"/edit/"+kvm_host[i]}>Edit</Button>
                    <Button size="small" href ={"/player/"+kvm_host[i]}>player</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
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
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}