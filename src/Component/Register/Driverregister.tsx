import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import axios from 'axios'
import {  useState } from 'react'
import CheckSharpIcon from '@mui/icons-material/CheckSharp';


interface driverdata {
    name: string,
    email: string,
    password: string,
    gender: string,
    city: string,
    address: string,
    mobile: number,
    licence: number
}


export default function Driverregister() {
    const [open, setopen] = useState(false)
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [gender, setgender] = useState('')
    const [city, setcity] = useState('')
    const [address, setaddress] = useState('')
    const [mobile, setmobile] = useState('')
    const [licence, setlicence] = useState('')

    function handleopen() {
        setopen(true)
    }

    function handleclose() {
        setopen(false)
    }

    function handleregister() {
        const datas: driverdata = {
            name, email, password, gender, city, address, mobile: Number(mobile), licence: Number(licence)
        }
        axios.post('http://localhost:4001/api/driver/register', datas)
            .then(() => {
                handleopen()
                setname(" ")
                setemail(" ")
                setpassword(" ")
                setgender(" ")
                setcity(" ")
                setaddress(" ")
                setmobile(" ")
            })
            .catch()
    }
    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '640px', flexGrow: 1, bgcolor: '#69f0ae' }}>

                <Box sx={{ height: 'auto', width: '500px', bgcolor: 'Background', borderRadius: 4, display: 'flex', flexDirection: 'column', marginInline: 5 }} boxShadow={7}>
                    <Box sx={{ margin: 2 }}>
                        <Typography color='#1b5e20' variant='h4'>Register page</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', margin: 2, gap: 2 }}>

                        <TextField type='text' size='small' label="Name" onChange={(e) => { setname(e.target.value) }} variant="filled" color="success" focused></TextField>

                        <TextField type='email' size='small' label="Email" onChange={(e) => { setemail(e.target.value) }} variant="filled" color="success" focused></TextField>

                        <TextField type='password' size='small' label="Password" onChange={(e) => { setpassword(e.target.value) }} variant="filled" color="success" focused></TextField>

                        <TextField type='text' size='small' label="gender" variant="filled" onChange={(e) => { setgender(e.target.value) }} color="success" focused></TextField>

                        <TextField type='text' size='small' label="city" variant="filled" onChange={(e) => { setcity(e.target.value) }} color="success" focused></TextField>

                        <TextField type='text' size='small' label="address" variant="filled" onChange={(e) => { setaddress(e.target.value) }} color="success" focused></TextField>

                        <TextField type='number' size='small' label="mobile no" onChange={(e) => { setmobile(e.target.value) }} variant="filled" color="success" focused></TextField>
                        <TextField type='number' size='small' label="licence no" onChange={(e) => { setlicence(e.target.value) }} variant="filled" color="success" focused></TextField>

                        <Button fullWidth variant='contained' onClick={handleregister}>Register</Button>
                    </Box>
                    <Modal
                        disablePortal
                        disableEnforceFocus
                        disableAutoFocus
                        open={open}
                        onClose={handleclose}
                        aria-describedby="server-modal-description"
                        sx={{
                            display: 'flex',
                            p: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Box
                            sx={(theme) => ({
                                position: 'relative',
                                width: 400,
                                bgcolor: 'background.paper',
                                border: '2px solid #000',
                                boxShadow: theme.shadows[5],
                                p: 4,
                            })}
                        >
                            <Typography id="server-modal-description" sx={{ pt: 2 }}>
                                Driver registered successfully
                            </Typography>
                            <Button color='success' sx={{ margin: 5 }} onClick={handleclose}>
                                <CheckSharpIcon />
                            </Button>
                        </Box>
                    </Modal>

                </Box>
            </Box>
        </div>
    )
}