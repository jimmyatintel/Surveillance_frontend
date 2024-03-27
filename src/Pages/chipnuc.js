import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function NucChipsArray(props) {
  const classes = useStyles();
  const [chipData, setChipData] = React.useState(props.Maillist);


  return (
    <Paper component="ul" className={classes.root}>
      {props.Maillist.map((data) => {
        return (
          <li key={data}>
            <Chip
              label={data}
              className={classes.chip}
            />
          </li>
        );
      })}
    </Paper>
  );
}