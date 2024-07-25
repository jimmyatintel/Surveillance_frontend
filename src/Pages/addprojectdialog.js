import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {addproject} from "../functions/main.js"

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [projectname, setprojectname] = React.useState("");
  const [projectcode, setprojectcode] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    addproject(projectname,projectcode)
    handleClose()
  }
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        New Project
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Adding a new project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Add a new project, please type your project name and code below. 
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="Project_name"
            label="Project Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setprojectname(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="Code"
            name="code"
            label="Code"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setprojectcode(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}