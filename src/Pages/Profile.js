import * as React from 'react';
import { useMsal } from '@azure/msal-react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import NucChipsArray from './chipnuc'
import Typography from '@mui/material/Typography';
import "./styles.css";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


export default function Profile(){
    const { instance, accounts } = useMsal();
    const [project_list, setproject_list] = React.useState(["Odin"]);
    const [alert_project_list, setalertproject_list] = React.useState(["Odin"]);
    return (
        <div className='profile_page_grid'>
            <Grid container spacing={2} md={12}>
            <Grid container spacing={2} md={4}>
                <Grid item md={12}>
                    <Typography variant="h4" component="h2">
                        User Info.
                    </Typography>
                </Grid>
                <Grid item md={12}>
                    <TextField id="outlined-read-only-input" label="Username" InputProps={{readOnly: true,}} variant="filled" defaultValue="Jimmy Wang"/>
                </Grid>
                <Grid item md={12}>
                    <TextField id="outlined-read-only-input" label="Email" InputProps={{readOnly: true,}} variant="filled" defaultValue="jimmyx.wang@intel.com"/>
                </Grid>
                <Grid item md={12}>
                <Typography variant="h5" component="h2">
                    Account Type
                </Typography>
                </Grid>
                <Grid item md={12}>
                <ToggleButtonGroup
                    color="primary"
                    value={'Admin'}
                    exclusive
                    // onChange={}
                    aria-label="Platform"
                    >
                    <ToggleButton value="Admin">Administrator</ToggleButton>
                    <ToggleButton value="Maintainer">Maintainer</ToggleButton>
                    <ToggleButton value="Normal User">Normal User</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
            </Grid>
            <Grid container spacing={2} md={8}>
                <Grid item md={3}></Grid>
                <Grid item md={9}>
                <Typography variant="h4" component="h2">
                    Assigned Project
                </Typography>
                </Grid>
                <Grid item md={3}></Grid>
                <Grid item md={9}>
                    <NucChipsArray key={String(project_list)} Maillist={project_list}/>
                </Grid>
                <Grid item md={3}></Grid>
                <Grid item md={9}>
                <Typography variant="h4" component="h2">
                    Subscripted Project Alert
                </Typography>
                </Grid>
                <Grid item md={3}></Grid>
                <Grid item md={9}>
                    <NucChipsArray key={String(alert_project_list)} Maillist={alert_project_list}/>
                </Grid>
            </Grid>
            </Grid>
        </div>
    )
};