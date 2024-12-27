import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import { useNavigate } from 'react-router-dom';


export default function AddTaxi() {
    const [open, setOpen] = useState(false);
    const [taxiname, setName] = useState('');
    const [taxibrand, setBrand] = useState('');
    const [taxiimage, setImage] = useState<File | null>(null);
    const [driverid, setDriverId] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }
    const navi = useNavigate()
    function handleRegister() {
        const formData = new FormData();
        formData.append('taxiname', taxiname);
        formData.append('taxibrand', taxibrand);
        if (taxiimage) formData.append('taxiimage', taxiimage);
        formData.append('driverid', driverid);
        formData.append('from', from);
        formData.append('to', to);

        axios
            .post('http://localhost:4001/api/taxi/create', formData)
            .then(() => {
                handleOpen();
                setName('');
                setBrand('');
                setImage(null);
                setDriverId('');
                setFrom('');
                setTo('');
                navi('/admin-panel/taxi-list')
            })
            .catch((error) => {
                console.error('Error registering taxi:', error);
            });
    }

    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '640px',
                    flexGrow: 1,
                }}
            >
                <Box
                    sx={{
                        height: 'auto',
                        width: '500px',
                        bgcolor: '#ef6c00',
                        borderRadius: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        marginInline: 5,
                    }}
                    boxShadow={7}
                >
                    <Box sx={{ margin: 2 }}>
                        <Typography color="primary" variant="h4">
                        Add a Taxi
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', margin: 2, gap: 2 }}>
                        <TextField
                            type="text"
                            size="small"
                            label="Taxi Name"
                            value={taxiname}
                            onChange={(e) => setName(e.target.value)}
                            variant="filled"
                           
                            focused
                        />
                        <TextField
                            type="text"
                            size="small"
                            label="Taxi Brand"
                            value={taxibrand}
                            onChange={(e) => setBrand(e.target.value)}
                            variant="filled"
                            focused
                        />
                        <TextField
                        fullWidth
                            type="file"
                            size="small"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setImage(e.target.files ? e.target.files[0] : null)}
                            focused
                        />
                        <TextField
                        fullWidth
                            type="text"
                            size="small"
                            label="Driver ID"
                            value={driverid}
                            onChange={(e) => setDriverId(e.target.value)}
                            variant="filled"
                            focused
                        />
                        <TextField
                            type="text"
                            size="small"
                            label="From"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            variant="filled"
                            focused
                        />
                        <TextField
                            type="text"
                            size="small"
                            label="To"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            variant="filled"
                            focused
                        />
                        <Button fullWidth variant="contained" onClick={handleRegister}>
                            upload
                        </Button>
                    </Box>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-describedby="server-modal-description"
                        sx={{
                            display: 'flex',
                            p: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                position: 'relative',
                                width: 400,
                                bgcolor: 'background.paper',
                                border: '2px solid #000',
                                boxShadow: 24,
                                p: 4,
                            }}
                        >
                            <Typography id="server-modal-description" sx={{ pt: 2 }}>
                                Taxi registered successfully!
                            </Typography>
                            <Button color="success" sx={{ margin: 5 }} onClick={handleClose}>
                                <CheckSharpIcon />
                            </Button>
                        </Box>
                    </Modal>
                </Box>
            </Box>
        </div>
    );
}
