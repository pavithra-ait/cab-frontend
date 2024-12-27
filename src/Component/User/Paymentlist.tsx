import { Box, Button, Container,  Modal, Table, TableBody, TableCell, TableHead, TableRow, Typography, } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CheckSharpIcon from '@mui/icons-material/CheckSharp';


interface Payment {
    _id:string
    bookingid: string,
    from: string,
    to: string,
    perkm_charge:number,
    total_amount:number,
    total_distance:number,
}



const Paymentlist: React.FC = () => {
    const [row, setrow] = useState<Payment[]>([])
    const [opene, setopene] = useState(false)
    function handleopene() {
        setopene(true)
    }

    function handleclosee() {
        setopene(false)
    }

    useEffect(() => {
        axios.get(`http://localhost:4001/api/payment/find`)
            .then(res => {
                setrow(res.data);
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <Box sx={{ height: '506px', width: '100%', display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'start', position: 'relative', top: '120px' }} >
            <Typography variant='h4'>Payment list</Typography>
            <Container>
                <Table sx={{ minWidth: 650 }} >
                    <TableHead sx={{ bgcolor: '#ef6c00' }}>
                        <TableRow>
                            <TableCell align="center">Booking id</TableCell>
                            <TableCell align="center">From</TableCell>
                            <TableCell align="center">To</TableCell>
                            <TableCell align="center">Perkm charge</TableCell>
                            <TableCell align="center">Total distance</TableCell>
                            <TableCell align="center">Bill</TableCell>
                            <TableCell align="center">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {row.map((row: Payment) => (
                            <TableRow key={row._id}>
                                <TableCell align="center">{row.bookingid}</TableCell>
                                <TableCell align="center">{row.from}</TableCell>
                                <TableCell align="center">{row.to}</TableCell>
                                <TableCell align="center">{row.perkm_charge}</TableCell>
                                <TableCell align="center">{row.total_distance}</TableCell>
                                <TableCell align="center">{row.total_amount}</TableCell>
                                <TableCell align="center">
                                    <Button variant='contained' color='warning' onClick={handleopene}>Paid </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Container>
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
                       amount has been transfer
                    </Typography>
                    <Button color='success' sx={{ margin: 5 }} onClick={handleclosee}>
                        <CheckSharpIcon />
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
}

export default Paymentlist;
