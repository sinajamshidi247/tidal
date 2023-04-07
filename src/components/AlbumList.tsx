import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, makeStyles} from '@mui/material';
import SelectonCardLoader from "./general/SelectonCardLoader";



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
    if(!props ){
        return(
            <SelectonCardLoader/>
            )
    }else{
        return(
            <Card className={"album-card"}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        // onLoad={}
                        image={props.cover_medium}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                            <p className={"truncate "}>{props.title}</p>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }
    // const classes = useStyles();
};

export default AlbumList;