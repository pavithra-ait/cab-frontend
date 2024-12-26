import { Box, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface Taxilists {
    taxiimage: string,
    taxibrand: string,
    taxiname: string,
    driverid: string,
    drivername: string,
    from: string,
    to: string
}

const Taxilist: React.FC = () => {
    const [row, setrow] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/api/taxi/find')
            .then(res => {
                setrow(res.data)
            })
            .catch(err => console.log(err))
    })
    return (
        <Box sx={{ height: '506px', width: '100%', display: 'flex',flexDirection:'column',gap:3, justifyContent: 'start',position:'relative',top:'120px' }} >
            <Typography variant='h4'>Taxi Details</Typography>
            <Container>
                <Table sx={{ minWidth: 650 }} >
                    <TableHead sx={{bgcolor:'#ef6c00'}}>
                        <TableRow>
                            <TableCell align="center"> Taxi Image</TableCell>
                            <TableCell align="center">Taxi brand</TableCell>
                            <TableCell align="center">Taxi Name</TableCell>
                            <TableCell align="center">Driver Id</TableCell>
                            <TableCell align="center">Driver Name</TableCell>
                            <TableCell align="center">From</TableCell>
                            <TableCell align="center">to</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {row.map((row: Taxilists,index) => (
                            <TableRow key={row.taxiname}>
                                <TableCell>
                                <img src={`http://localhost:4000/api/taxi/view/${row.taxiimage}`} alt={row.taxiname} width="100" />
                                    
                                </TableCell>
                                <TableCell align="center">{row.taxibrand}</TableCell>
                                <TableCell align="center">{row.taxiname}</TableCell>
                                <TableCell align="center">{`D${index+1}`}</TableCell>
                                <TableCell align="center">{row.drivername}</TableCell>
                                <TableCell align="center">{row.from}</TableCell>
                                <TableCell align="center">{row.to}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Container>
        </Box>
    )
}

export default Taxilist;
