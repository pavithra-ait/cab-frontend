import { Box, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface Paylists {
    _id: string,
    total_amount: number,
    total_distance: number,
    perkm_charge: number,
    bookingid: string,
    from: string,
    to: string
}

const Transactionlist: React.FC = () => {
    const [row, setrow] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/api/payment/find')
            .then(res => {
                setrow(res.data)
            })
            .catch(err => console.log(err))
    })
    return (
        <Box sx={{ height: '506px', width: '100%', display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'start', position: 'relative', top: '120px' }} >
            <Typography variant='h4'>Payment Details</Typography>
            <Container>
                <Table sx={{ minWidth: 650 }} >
                    <TableHead sx={{ bgcolor: '#ef6c00' }}>
                        <TableRow>
                            <TableCell align="center"> Booking id</TableCell>
                            <TableCell align="center">From</TableCell>
                            <TableCell align="center">to</TableCell>
                            <TableCell align="center">Kmtr_charge </TableCell>
                            <TableCell align="center">Total distance</TableCell>
                            <TableCell align="center">Total amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {row.map((row: Paylists, index) => (
                            <TableRow key={row._id}>
                                <TableCell align="center">{`B${index + 1}`}</TableCell>
                                <TableCell align="center">{row.from}</TableCell>
                                <TableCell align="center">{row.to}</TableCell>
                                <TableCell align="center">{`$${row.perkm_charge}`}</TableCell>
                                <TableCell align="center">{`${row.total_distance}`}</TableCell>
                                <TableCell align="center">{`$${row.total_amount}`}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Container>
        </Box>
    )
}

export default Transactionlist;
