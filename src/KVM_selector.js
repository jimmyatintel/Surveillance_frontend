import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import Grid from '@mui/material/Grid';

export default function SelectLabels() {
  const [kvm, setkvm] = React.useState('');
  const [dbg, setdbg] = React.useState('');
  const [dut, setdut] = React.useState('');
  const KVMhandleChange = (event) => {
    setkvm(event.target.value);
  };
  const DBGhandleChange = (event) => {
    setdbg(event.target.value);
  };
  const DUThandleChange = (event) => {
    setdut(event.target.value);
  };
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">KVM</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          value={kvm}
          label="KVM"
          onChange={KVMhandleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>18F_AI01</MenuItem>
          <MenuItem value={20}>18F_AI02</MenuItem>
          <MenuItem value={30}>18F_AI03</MenuItem>
        </Select>
        {/* <FormHelperText>With label + helper text</FormHelperText> */}
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 180 }}>
        <InputLabel id="demo-simple-select-helper-label">Debug Host</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          value={dbg}
          label="Debug Host"
          onChange={DBGhandleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>twndbg1</MenuItem>
          <MenuItem value={20}>twndbg2</MenuItem>
          <MenuItem value={30}>twndbg3</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 180 }}>
        <InputLabel id="demo-simple-select-helper-label">DUT Name</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          value={dut}
          onChange={DUThandleChange}
          label="DUT Name"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Willi01</MenuItem>
          <MenuItem value={20}>Willi02</MenuItem>
          <MenuItem value={30}>Willi03</MenuItem>
        </Select>
      </FormControl>
      <Grid item xs={4}>
        <KeyboardIcon></KeyboardIcon>
      </Grid>
    </div>
  );
}