import { Box, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface Driverlists {
    name: string,
    email: string,
    pasword: string,
    gender: string,
    city: string,
    address: string,
    mobile: number,
    licence: number,
}

const Driverlist: React.FC = () => {
    const [row, setrow] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4001/api/driver/all')
            .then(res => {
                setrow(res.data)
            })
            .catch(err => console.log(err))
    })
    return (
        <Box sx={{ height: '506px', width: '100%', display: 'flex',flexDirection:'column',gap:3, justifyContent: 'start',position:'relative',top:'120px' }} >
            <Typography variant='h4'>Driver List</Typography>
            <Container>
                <Table sx={{ minWidth: 650 }} >
                    <TableHead sx={{bgcolor:'#ef6c00'}}>
                        <TableRow>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Gender</TableCell>
                            <TableCell align="center">city</TableCell>
                            <TableCell align="center">address</TableCell>
                            <TableCell align="center">mobile</TableCell>
                            <TableCell align="center">licence</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {row.map((row: Driverlists) => (
                            <TableRow key={row.name}>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                                <TableCell align="center">{row.gender}</TableCell>
                                <TableCell align="center">{row.city}</TableCell>
                                <TableCell align="center">{row.address}</TableCell>
                                <TableCell align="center">{row.mobile}</TableCell>
                                <TableCell align="center">{row.licence}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Container>
        </Box>
    )
}

export default Driverlist;
