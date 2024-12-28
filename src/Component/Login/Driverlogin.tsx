import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import { Link, useNavigate } from 'react-router-dom';

interface Driverlogins {
    email: string,
    password: string,
}


export default function Driverlogin() {
    const [open, setopen] = useState(false)
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    function handleopen() {
        setopen(true)
    }

    function handleclose() {
        setopen(false)
    }
    const navi = useNavigate()

   async function handlelogin() {
        const datas: Driverlogins = {
            email, password
        }
        if (email === 'admin@gmail.com' && password === 'admin') {
            navi('/admin-panel')
            localStorage.setItem("admin", "admin")

        } else {

          await axios.post('http://localhost:4001/api/driver/login', datas)
                .then((res) => {
                    localStorage.setItem("driver", res.data.token)
                    handleopen()
                    setemail(" ")
                    setpassword(" ")
                    navi('/driver-panel')

                })
                .catch(err=>{
                    console.log(err)
                })
        }

    }
    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '640px', flexGrow: 1 }}>

                <Box  sx={{ height: 'auto', width: '400px',  bgcolor:'#ef6c00', borderRadius: 4, display: 'flex', flexDirection: 'column', marginInline: 5 }} boxShadow={7}>
                    <Box sx={{ margin: 2 }}>
                        <Typography color='#d500f9' variant='h4'>Login...!!</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', margin: 4, gap: 4, fontSize: 10, fontWeight: 900 }}>

                        <TextField fullWidth type='email' size='small' label="Email" onChange={(e) => { setemail(e.target.value) }} variant="standard" color="secondary" focused></TextField>

                        <TextField fullWidth type='password' size='small' variant='standard' label="Password" onChange={(e) => { setpassword(e.target.value) }} color="secondary" focused></TextField>

                        <Button fullWidth variant='contained' color='secondary' onClick={handlelogin}>Login</Button>
                        <Link to={'/driver-register'}>Don't account ? Register first</Link>
                    
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
                                Driver  Login successfully
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