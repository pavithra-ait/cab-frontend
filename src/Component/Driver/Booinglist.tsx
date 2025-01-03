import { Box, Button, Container, FormControl, Modal, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';

interface Bookinglists {
    taxiid: string;
    userid: string;
    pickup_time: string;
    booking_date: string;
    from: string;
    to: string;
    _id: string;
}

interface Trip {
    bookingid: string;
    amount: string;
    currency: string;
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
    const stripe = useStripe();
    const elements = useElements();
    const [row, setRow] = useState<Bookinglists[]>([]);
    const [open, setOpen] = useState(false);
    const [bookingid, setBookingid] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [currency, setCurrency] = useState<string>('usd');
    const [openSuccess, setOpenSuccess] = useState(false);
    const handleClose = () => setOpen(false);
    const handleSuccessClose = () => setOpenSuccess(false);

    const handleEdit = (item: Bookinglists) => {
        setBookingid(item._id);
        setOpen(true);
    };


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const data: Trip = {
            bookingid,
            amount,
            currency,
        };

        console.log('Making API call to create payment intent...');
        await axios.post('http://localhost:4242/api/payment/create-payment-intent', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log('Payment Intent Created:', response);
                setOpen(false);
                setOpenSuccess(true);
            })
            .catch(error => {
                console.error('Payment failed', error.response ? error.response.data : error);
            });

    };


    useEffect(() => {
        axios.get('http://localhost:4001/api/book/find')
            .then(res => {
                setRow(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <Box sx={{ height: '506px', width: '100%', display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'start', position: 'relative', top: '120px' }}>
            <Typography variant='h4'>Booking list</Typography>
            <Container>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead sx={{ bgcolor: '#ef6c00' }}>
                        <TableRow>
                            <TableCell align="center">Taxi id</TableCell>
                            <TableCell align="center">User id</TableCell>
                            <TableCell align="center">Pickup time</TableCell>
                            <TableCell align="center">Booking date</TableCell>
                            <TableCell align="center">From</TableCell>
                            <TableCell align="center">To</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {row.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell align="center">{item.taxiid}</TableCell>
                                <TableCell align="center">{item.userid}</TableCell>
                                <TableCell align="center">{item.pickup_time}</TableCell>
                                <TableCell align="center">{item.booking_date}</TableCell>
                                <TableCell align="center">{item.from}</TableCell>
                                <TableCell align="center">{item.to}</TableCell>
                                <TableCell align="center">
                                    <Button variant='contained' color='warning' onClick={() => handleEdit(item)}>
                                        Payment
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Container>

            {/* Payment Modal */}
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Typography variant='h5' color='warning' sx={{ marginBlock: 1, textAlign: 'center' }}>
                        Payment Details
                    </Typography>

                    <FormControl sx={{ display: 'flex', gap: 4, width: '100%', flexWrap: 'wrap', flexDirection: 'row', marginBlock: 2 }}>
                        <TextField
                            fullWidth
                            label="Booking ID"
                            type="text"
                            value={bookingid}
                            onChange={(e) => setBookingid(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Currency"
                            type="text"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            required
                        />
                    </FormControl>

                    <Button fullWidth color='warning' variant='contained' onClick={handleSubmit}>
                        Submit Payment
                    </Button>
                </Box>
            </Modal>

            {/* Success Modal */}
            <Modal open={openSuccess}>
                <Box sx={style}>
                    <Typography variant="h5" color="success" sx={{ textAlign: 'center' }}>
                        Payment Successful!
                    </Typography>
                    <Button color='success'  onClick={handleSuccessClose}>
                        <CheckSharpIcon />
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default Bookinglist;
