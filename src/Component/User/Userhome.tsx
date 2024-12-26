import { Box, Container, Typography } from '@mui/material'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const itemData = [
    {
        img: 'https://t4.ftcdn.net/jpg/02/09/67/65/240_F_209676566_5x5IlTNUkKR8xQT3b8hh8b6SmXurdMsY.jpg',
        title: 'Pannirmadai',
        author: '@bkristastucchio',
        featured: true,
    },
    {
        img: 'https://t4.ftcdn.net/jpg/01/11/73/69/240_F_111736989_S1umzHim1wGkgOlD9DEUW3DEuYmwbtbu.jpg',
        title: 'Mumbai',
        author: '@rollelflex_graphy726',
    },
    {
        img: 'https://t3.ftcdn.net/jpg/03/60/89/54/240_F_360895457_EKcyaOUVpe4QrAEndFUsVvU9kMoiAY1F.jpg',
        title: 'Kerala',
        author: '@helloimnik',
    },
    {
        img: 'https://t4.ftcdn.net/jpg/04/84/43/03/240_F_484430334_Suu96PYvIhukvnoleFN1WfTTCfWWBx0V.jpg',
        title: 'Erode',
        author: '@nolanissac',
    },
    {
        img: 'https://t3.ftcdn.net/jpg/05/07/88/80/240_F_507888022_oGUxgw7czFKvIOuT9m0iozK0pRlbpDEm.jpg',
        title: 'Palani',
        author: '@hjrc33',
    },
    {
        img: 'https://t4.ftcdn.net/jpg/04/58/47/69/240_F_458476945_xxSRP8Ygf4GnwII01jw1chwM6bK5AZ4f.jpg',
        title: 'Vsk',
        author: '@arwinneil',
    },
    {
        img: 'https://t3.ftcdn.net/jpg/01/93/97/34/240_F_193973434_bWxMtPMo7kSbGzDlLhswbTyknCcQOSIq.jpg',
        title: 'Thudilur',
        author: '@tjdragotta',
    },
    {
        img: 'https://t4.ftcdn.net/jpg/03/87/58/63/240_F_387586341_OeNqX2OqyDzx3g28gy8y39Y7cU0Novv2.jpg',
        title: 'Salem',
        author: '@katie_wasserman',
    },
    {
        img: 'https://t3.ftcdn.net/jpg/07/49/64/50/240_F_749645093_0MRa6Zs300siMruL3L5A8727T6tWhVLj.jpg',
        title: 'Chennai',
        author: '@silverdalex',
    },
    {
        img: 'https://t4.ftcdn.net/jpg/03/92/05/29/240_F_392052969_DVDsBb01OMSEWOYsuY5EV95LqDWmrLNu.jpg',
        title: 'Maruthamalai',
        author: '@shelleypauls',
    },
    {
        img: 'https://t3.ftcdn.net/jpg/01/10/45/70/240_F_110457041_xY2pPlOjPjX70wyOWlE5vc74HdCwZ7OM.jpg',
        title: 'Gp',
        author: '@peterlaster',
    },
    {
        img: 'https://t3.ftcdn.net/jpg/02/42/70/08/240_F_242700853_JDZItO9VaDznqhtDr2nnmwdsfqrUWJDf.jpg',
        title: 'Gnmills',
        author: '@southside_customs',
    },
];

export default function Userhome() {
    return (
        <Box sx={{ height: '506px', width: '100%', position: 'relative', top: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
            <Box sx={{ width: '400px', height: '70px' }}>
                <Typography variant='h4'  color='warning'>Cab Booking App</Typography>
            </Box>
            <Container>
                <div className='imagelist' style={{ height: 400, width: '100%' }}>
                    <ImageList sx={{ width: '100%', height: 400 }}>
                        {itemData.map((item) => (
                            <ImageListItem key={item.img}>
                                <img
                                    srcSet={`${item.img}?w=200&fit=crop&auto=format&dpr=2 2x`}
                                    src={`${item.img}?w=248&fit=crop&auto=format`}
                                    alt={item.title}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    title={item.title}
                                    subtitle={<span>by: {item.author}</span>}
                                    position="below"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            </Container>
        </Box>
    )
}

