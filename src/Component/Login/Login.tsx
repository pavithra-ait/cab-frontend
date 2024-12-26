import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import { useNavigate } from 'react-router-dom';

interface logindata {
    email: string,
    password: string,
}


export default function Login() {
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

    function handlelogin() {
        const datas: logindata = {
            email, password
        }
        axios.post('http://localhost:4000/api/user/login', datas)
            .then((res) => {
                localStorage.setItem("user", res.data.token)
                handleopen()
                setemail(" ")
                setpassword(" ")
            })
            .catch()
    }
    useEffect(() => {
        const auth = localStorage.getItem('user')
        if (auth) {
            navi('/user-panel')
        }
    })
    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '640px', flexGrow: 1, backgroundImage: 'url("./image/login.png")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>

                <Box sx={{ height: 'auto', width: '400px', bgcolor: 'tranparent', backdropFilter: 'blur(10px)', borderRadius: 4, display: 'flex', flexDirection: 'column', marginInline: 5 }} boxShadow={7}>
                    <Box sx={{ margin: 2 }}>
                        <Typography color='#d500f9' variant='h4'>Login...!!</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', margin: 4, gap: 4, fontSize: 10, fontWeight: 900 }}>

                        <TextField fullWidth type='email' size='small' label="Email" onChange={(e) => { setemail(e.target.value) }} variant="standard" color="secondary" focused></TextField>

                        <TextField fullWidth type='password' size='small' variant='standard' label="Password" onChange={(e) => { setpassword(e.target.value) }} color="secondary" focused></TextField>

                        <Button fullWidth variant='contained' color='secondary' onClick={handlelogin}>Login</Button>
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
                                Login successfully
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