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

const card = (
  <React.Fragment>
    <CardContent>
      <Typography variant="h5" component="div">
        KVM
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        adjective
      </Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);

export default function KvmCard(props) {
  return (
    <Box sx={{ maxWidth: 250 }}>
      <Card variant="outlined">
        <React.Fragment>
            <CardContent>
            <Typography variant="h5" component="div">
                KVM
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {props.package.hostname}
            </Typography>
            <Typography variant="body2">
                ip: {props.package.ip}
                <br />
                owner: {props.package.owner}
                <br />
                status: {props.package.status}
                <br />
                version: {props.package.version}
                <br />
                NAS ip: {props.package.nasip}
                <br />
                Stream url: {props.package.streamurl}
                <br />
                Stream status: {props.package.streamstatus}
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