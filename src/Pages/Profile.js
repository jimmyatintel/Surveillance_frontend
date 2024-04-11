import { useMsal } from '@azure/msal-react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

// const { instance, accounts } = useMsal();
export default function Profile(){
    return (
        <div className='page_grid'>
            <Grid container spacing={2}>
                <Grid item md={4}>
                    <TextField id="outlined-read-only-input" label="Username" variant="standard" defaultValue="Hello World"/>
                </Grid>
            </Grid>
        </div>
    )
};