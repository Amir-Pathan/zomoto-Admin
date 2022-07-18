import React from "react";
import { Button, Grid,Typography } from "@mui/material";

function PlusProduct(props){

    const {title,name,open} = props

    return(
        <Grid xs={12} md={12} item container style={{marginTop:'70px'}}>
            <Grid item xs={8} md={10}>
                <Typography style={{paddingLeft:'15px'}} variant="h6">{title}</Typography>
            </Grid>
            <Grid item xs={4} md={2}>
                <Button onClick={open}>Add {name}</Button>
            </Grid>
        </Grid>
    )
}

export default PlusProduct