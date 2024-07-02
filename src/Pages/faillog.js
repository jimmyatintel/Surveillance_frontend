import * as React from 'react';
import ReactHlsPlayer from "react-hls-player";
import "./styles.css";
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import {useParams} from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { get_dut_map } from "../functions/main.js"
export default function Faillog(){
    const {device} =useParams()
    const [Steps, setSteps] = React.useState(0);
    const [totalStep, setTotalStep] = React.useState(20);
    const [hlsUrl, setHlsUrl] = React.useState("");
    const [project, setproject] = React.useState("");
    React.useEffect(() => {
        get_dut_map(device).then(res=>{
            setproject(res.data.project)
        })
      }, [])

    return (
        <div className=''>
            <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '90vh'}}
            >
                <Typography variant="h2" component="h2" sx={{marginTop: '3vh',marginBottom: '3vh'}}>
                {device} Error Log
                </Typography>
                
                <Grid container spacing={1}>
                <Grid item xs={1}/>
                    <Grid item xs={6}>
                        <ReactHlsPlayer
                            className="player-window"
                            src={hlsUrl}
                            autoPlay={false}
                            controls={true}
                            width="100%"
                            height="auto"
                        />
                    </Grid>
                    <Grid item xs={3}>
                    <Card >
                        <CardContent sx={{ textAlign: 'left', flexDirection: 'column', display: 'flex' }}>
                            <Typography variant="h5" component="h5" gutterBottom>
                                Information of this Crush
                            </Typography>
                            <Typography variant="subtitle1" component="subtitle1" sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>
                                Project: {project}
                            </Typography>
                            <Typography variant="subtitle1" component="subtitle1" sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>
                                Crush Time: 
                            </Typography>
                            <Typography variant="subtitle2" component="subtitle2" sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>
                                Type: 
                            </Typography>
                            <Typography variant="subtitle2" component="subtitle2" sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>
                                Test Item: 
                            </Typography>
                            <Typography variant="subtitle2" component="subtitle2" sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>
                                SKU: 
                            </Typography>
                            <Typography variant="subtitle2" component="subtitle2" sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>
                                Image: 
                            </Typography>
                            <Typography variant="subtitle2" component="subtitle2" sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>
                                BIOS: 
                            </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={2}/>
                </Grid>
                <DotsMobileStepper activeStep={Steps} setActiveStep={setSteps} totalStep={totalStep}></DotsMobileStepper>
            </Grid>
        </div>
    )
};
function DotsMobileStepper({ activeStep, setActiveStep, totalStep }) {
    const theme = useTheme();
    // const [activeStep, setActiveStep] = React.useState(0);
    // const [totalStep, setTotalStep] = React.useState(20);
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    return (
      <MobileStepper
        variant="dots"
        steps={totalStep}
        position="static"
        activeStep={activeStep}
        sx={{ minWidth: 800, flexGrow: 1 }}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === totalStep-1}>
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    );
  }