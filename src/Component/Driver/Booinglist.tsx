import { Box, Button, Container, FormControl, Modal, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography, } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CheckSharpIcon from '@mui/icons-material/CheckSharp';


interface Bookinglists {
    taxiid: string,
    userid: string,
    pickup_time: string,
    booking_date: string,
    from: string,
    to: string,
    _id: string
}


interface Trip {
    bookingid: string,
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


const Bookinglist: React.FC = () => {
    const [row, setrow] = useState<Bookinglists[]>([])

    const [open, setOpen] = useState(false);
    const [bookingid, setbookingid] = useState<string>('');

    const [opene, setopene] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleEdit = (item: Bookinglists) => {
        setbookingid(item._id);
        setOpen(true);
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {

        const Trip: Trip = {
            bookingid: bookingid,
        };

        await axios.post('http://localhost:4001/api/payment/create', Trip)
            .then((res) => {
                setOpen(false);
                handleClose()
                handleopene()
                console.log(res.data);

            }).catch((err) => {
                console.log(err)
            })


    };



    function handleopene() {
        setopene(true)
    }

    function handleclosee() {
        setopene(false)
    }

    useEffect(() => {
        axios.get(`http://localhost:4001/api/book/find`)
            .then(res => {
                setrow(res.data);
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <Box sx={{ height: '506px', width: '100%', display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'start', position: 'relative', top: '120px' }} >
            <Typography variant='h4'>Booking list</Typography>
            <Container>
                <Table sx={{ minWidth: 650 }} >
                    <TableHead sx={{ bgcolor: '#ef6c00' }}>
                        <TableRow>
                            <TableCell align="center">Taxi id</TableCell>
                            <TableCell align="center">User id</TableCell>
                            <TableCell align="center">Pickup time</TableCell>
                            <TableCell align="center">Booking date</TableCell>
                            <TableCell align="center">From</TableCell>
                            <TableCell align="center">To</TableCell>
                            <TableCell align="center">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {row.map((row: Bookinglists) => (
                            <TableRow key={row._id}>
                                <TableCell align="center">{row.taxiid}</TableCell>
                                <TableCell align="center">{row.userid}</TableCell>
                                <TableCell align="center">{row.pickup_time}</TableCell>
                                <TableCell align="center">{row.booking_date}</TableCell>
                                <TableCell align="center">{row.from}</TableCell>
                                <TableCell align="center">{row.to}</TableCell>
                                <TableCell align="center">
                                    <Button variant='contained' color='warning' onClick={() => {
                                        handleEdit(row)
                                        handleOpen()
                                    }}>Payment</Button>
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
                    <Typography variant='h5' color='warning' sx={{ marginBlock: 1, textAlign: 'center' }}>Payment generate</Typography>

                    <FormControl sx={{ display: 'flex', gap: 4, width: '100%', flexWrap: 'wrap', flexDirection: 'row', marginBlock: 2 }}>
                        <TextField
                            fullWidth
                            label="Booking id"
                            name="Booking id"
                            type="text"
                            value={bookingid}
                            onChange={(e) => setbookingid(e.target.value)}
                            margin="normal"
                            color='warning'
                            focused
                            required
                        />
                       

                    </FormControl>

                    <Button fullWidth color='warning' variant='contained' onClick={handleSubmit}>Payment</Button>
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
                        Payment  is success fully send
                    </Typography>
                    <Button color='success' sx={{ margin: 5 }} onClick={handleclosee}>
                        <CheckSharpIcon />
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
}

export default Bookinglist;
