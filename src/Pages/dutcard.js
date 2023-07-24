import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function DutCard(props) {
  return (
    <Box sx={{ maxWidth: 250 }}>
      <Card variant="outlined">
        <React.Fragment>
            <CardContent>
            <Typography variant="h5" component="div">
                DUT
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {props.package.machine_name}
            </Typography>
            <Typography variant="body2">
                ssim: {props.package.ssim}
                <br />
                status: {props.package.status}
                <br />
            </Typography>
            </CardContent>
            <CardActions>
            <Button size="small">Learn More</Button>
            </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
}