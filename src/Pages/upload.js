import React from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
export default function Uploads() {
    const handlekvmclick = () => {
        document.getElementById('kvmfile').click()
    }
    const handledutclick = () => {
        document.getElementById('dutfile').click()
    }
    const handledbgclick = () => {
        document.getElementById('dbgfile').click()
    }
    const handlemapclick = () => {
        document.getElementById('mapfile').click()
    }
    const handlekvmfile = () => {
        console.log('kvm file uploaded')
    }
    const handledutfile = () => {
        console.log('dut file uploaded')
    }
    const handledbgfile = () => {
        console.log('dbg file uploaded')
    }
    const handlemapfile = () => {
        console.log('map file uploaded')
    }
    return (
        <div>
            <FormControl sx={{ m: 2, minWidth: 30 }}>
                <Button variant="contained" onClick={handlekvmclick}>
                    KVM
                    <input id="kvmfile" type="file" hidden onChange={handlekvmfile}/>
                </Button>
            </FormControl>
            <FormControl sx={{ m: 2, minWidth: 30 }}>
                <Button variant="contained" onClick={handledutclick}>
                    DUT
                    <input id="dutfile" type="file" hidden onChange={handledutfile}/>
                </Button>
            </FormControl>
            <FormControl sx={{ m: 2, minWidth: 30 }}>
                <Button variant="contained" onClick={handledbgclick}>
                    DBG
                    <input id="dbgfile" type="file" hidden onChange={handledbgfile}/>
                </Button>
            </FormControl>
            <FormControl sx={{ m: 2, minWidth: 30 }}>
                <Button variant="contained" onClick={handlemapclick}>
                    mapping
                    <input id="mapfile" type="file" hidden onChange={handlemapfile}/>
                </Button>
            </FormControl>
        </div>
    )
}
        