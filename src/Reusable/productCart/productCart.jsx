import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

function ProductCart({imgUrl,title,id,description,isActive,update}){

  const [isEnter,setEnter] = useState(false)

  const focusEnterHandle=()=>setEnter(true)

  const focusOutHandle=()=>setEnter(false)

  const updateProduct=()=>update(id,title,description,imgUrl,isActive)

    return(
        <>
        <Card sx={{ maxWidth: 345 }} onMouseEnter={focusEnterHandle} 
        onMouseLeave={focusOutHandle}>
         {
          isEnter?
            <EditIcon cursor='pointer' onClick={updateProduct}/>
          :
          null
         }
         <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={imgUrl}
              alt={title}
            />
           <CardContent>
             <Typography gutterBottom variant="h5" component="div">
              {title}
             </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
        </>
    )

}

export default ProductCart