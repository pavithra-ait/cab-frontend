import { Box, Button, Container, FormControl, Modal, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';


interface Taxilists {
    _id: string | null
    taxiimage: string,
    taxibrand: string,
    taxiname: string,
    driverid: string,
    drivername: string,
    from: string,
    to: string,
    available: boolean,
    userid: string | null,
    taxiid: string | null
}

interface Booking {
    from: string,
    to: string,
    pickup_time: string,
    booking_date: string,
    userid: string | null,
    taxiid: string | null
}
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Taxiavailable: React.FC = () => {
    const [row, setrow] = useState([])
    const [open, setOpen] = useState(false);
    const [userid, setuserid] = useState<string | null>(null);
    const [from, setfrom] = useState<string>("");
    const [dates, setdates] = useState<string>("");
    const [time, settime] = useState<string>("");
    const [to, setto] = useState<string>("");
    const [taxiId, settaxiId] = useState<string | null>(null);
    const [opene, setopene] = useState(false)


    function handleopene() {
        setopene(true)
    }

    function handleclosee() {
        setopene(false)
    }

    useEffect(() => {
        axios.get('http://localhost:4001/api/taxi/available')
            .then(res => {
                setrow(res.data)
            })
            .catch(err => console.log(err))
    })


    const handleEdit = (item: Taxilists) => {
        const user_id = localStorage.getItem('id');
        settaxiId(item._id);
        setuserid(user_id);
        setfrom(item.from);
        setto(item.to);
        setOpen(true);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {



        const booking: Booking = {
            userid: userid,
            taxiid: taxiId,
            from: from,
            to: to,
            pickup_time: time,
            booking_date: dates,
        };

        axios.post('http://localhost:4001/api/book/create', booking)
            .then(() => {
                setuserid(null);
                setOpen(false);
                handleClose()
                handleopene()
            }).catch((err) => {
                console.log(err)
            })


    };
    return (
        <Box sx={{ height: '506px', width: '100%', display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'start', position: 'relative', top: '120px' }} >
            <Typography variant='h4' color='warning'>Taxi Available</Typography>
            <Container>
                <Table sx={{ minWidth: 650 }}  >
                    <TableHead sx={{ bgcolor: 'black', color: 'inherit' }}>
                        <TableRow>
                            <TableCell align="center" sx={{ color: "#ef6c00" }}> Taxi Image</TableCell>
                            <TableCell align="center" sx={{ color: "#ef6c00" }}>Taxi brand</TableCell>
                            <TableCell align="center" sx={{ color: "#ef6c00" }}>Taxi Name</TableCell>
                            <TableCell align="center" sx={{ color: "#ef6c00" }}>Driver Id</TableCell>
                            <TableCell align="center" sx={{ color: "#ef6c00" }}>Driver Name</TableCell>
                            <TableCell align="center" sx={{ color: "#ef6c00" }}>From</TableCell>
                            <TableCell align="center" sx={{ color: "#ef6c00" }}>to</TableCell>
                            <TableCell align="center" sx={{ color: "#ef6c00" }}>available</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {row.map((row: Taxilists, index) => (
                            <TableRow key={row._id}>
                                <TableCell>
                                    <img src={`http://localhost:4001/api/taxi/view/${row.taxiimage}`} alt={row.taxiname} width="100" />

                                </TableCell>
                                <TableCell align="center" sx={{ color: "#ef6c00" }}>{row.taxibrand}</TableCell>
                                <TableCell align="center" sx={{ color: "#ef6c00" }}>{row.taxiname}</TableCell>
                                <TableCell align="center" sx={{ color: "#ef6c00" }}>{`D${index + 1}`}</TableCell>
                                <TableCell align="center" sx={{ color: "#ef6c00" }}>{row.drivername}</TableCell>
                                <TableCell align="center" sx={{ color: "#ef6c00" }}>{row.from}</TableCell>
                                <TableCell align="center" sx={{ color: "#ef6c00" }}>{row.to}</TableCell>
                                <TableCell align="center" sx={{ color: "#ef6c00" }}>
                                    <Button color='warning' variant='contained' onClick={() => {
                                        handleEdit(row)
                                        handleOpen()
                                    }}>
                                        Book now
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Container>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant='h5' color='warning' sx={{ marginBlock: 1, textAlign: 'center' }}>Taxi booking</Typography>

                    <FormControl sx={{ display: 'flex', gap: 4, width: '100%', flexWrap: 'wrap', flexDirection: 'row', marginBlock: 2 }}>
                        <TextField type='text' color='warning' value={taxiId} onChange={(e) => { settaxiId(e.target.value) }} label="Taxi id" 
                        sx={{width:230}} focused required />
                        <TextField type='text' value={userid} onChange={(e) => { setuserid(e.target.value) }} color='warning' label="User id"  focused
                        sx={{width:230}} required />
                        <TextField
                            sx={{ width: 230 }}
                            label="From"
                            name="from"
                            type="string"
                            value={from}
                            onChange={(e) => setfrom(e.target.value)}
                            margin="normal"
                            color='warning'
                            focused
                            required
                        />
                        <TextField
                            sx={{ width: 230 }}

                            label="To"
                            name="To"
                            type="text"
                            value={to}
                            onChange={(e) => setto(e.target.value)}
                            margin="normal"
                            color='warning'
                            focused
                            required
                        />
                        <TextField
                            sx={{ width: 230 }}
                            label="Pickup Time"
                            name="Pickup Time"
                            type="time"
                            value={time}
                            onChange={(e) => settime(e.target.value)}
                            margin="normal"
                            color='warning'
                            focused
                            required
                        />
                        <TextField
                            sx={{ width: 230 }}
                            label="Booking date"
                            name="Booking_date"
                            type="date"
                            value={dates}
                            onChange={(e) => setdates(e.target.value)}
                            margin="normal"
                            color='warning'
                            focused
                            required
                        />
                    </FormControl>

                    <Button fullWidth color='warning' variant='contained' onClick={handleSubmit}>Book</Button>
                </Box>
            </Modal>
            <Modal
                disablePortal
                disableEnforceFocus
                disableAutoFocus
                open={opene}
                onClose={handleclosee}
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
                        your cab is booked
                    </Typography>
                    <Button color='success' sx={{ margin: 5 }} onClick={handleclosee}>
                        <CheckSharpIcon />
                    </Button>
                </Box>
            </Modal>
        </Box>
    )
}

export default Taxiavailable;
