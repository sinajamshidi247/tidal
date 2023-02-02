import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, makeStyles} from '@mui/material';



interface AlbumInfo {
    cover_medium:string,
    link:string,
    id:number,
    title:string,
}

// const useStyles = makeStyles(theme:any => ({
//     root: {
//         maxWidth: 345,
//         [theme.breakpoints.down("md")] : {
//             maxWidth: 200
//         }
//     },
//     media: {
//         height: 140
//     }
// }));


const AlbumList = (props:AlbumInfo) =>{
    // const classes = useStyles();
    return(
        <Card>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="150"
                    image={props.cover_medium}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
};

export default AlbumList;