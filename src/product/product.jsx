import React,{useEffect, useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { zomotoUser } from '../redux/user/action';
import PlusProduct from '../Reusable/plusProduct/plusProduct';
import BasicModal from '../Reusable/model/basicModel';
import { Typography,Grid,TextField, Button, TextareaAutosize} from '@mui/material';
import ImageUpload from '../Reusable/imageUpload/imageUpload';
import Services from '../services/service';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import AlertDialogSlide from '../Reusable/dialog/dialog';
import ProductCart from '../Reusable/productCart/productCart';


const style={
  btnColor:{
    backgroundColor:'#cb202d',
    color:'white'
}
}

function Products(){

  const initialProduct ={
    productName:'',
    productOriginalPrice:'',
    productDiscountedPrice:"",
    productImg:'',
    productDescription:'',
    productMaxQty:10,
    productMinQty:1,
    productStock:10,
    productActive:true,
    productCategory:'',
    userId:'',
  }

    const [product,setProduct] = useState(initialProduct)

    const [categoryList,setCategoryList] = useState([])

    const [user,setUser] = useState({})
    const [no,setNo] = useState(0)
    const [isOpen,setIsOpen] = useState(false)

    const [productId,setProductId] = useState('')

    const [isError,setError] = useState(false)

    const [title,setTitle] = useState('')

    const [content,setContent] = useState('')

    const [isZomoto,setIsZomoto] = useState(false)

    const [productList,setProductList] = useState([])

    const [isUpdate,setIsUpdate] = useState(false)

    const dispatch=useDispatch()

    const data = useSelector((state)=>state.user)

    const clearProduct=()=>{
      setProduct({
        productName:'',
        productOriginalPrice:'',
        productDiscountedPrice:"",
        productImg:'',
        productDescription:'',
        productMaxQty:10,
        productMinQty:1,
        productStock:10,
        productActive:true,
        productCategory:'',
        userId:'',
      })
    }

    useEffect(()=>{

      dispatch(zomotoUser())
      setUser(data)
      setNo(1)

      if(data.no==='7741943487'){
        setIsZomoto(true)
      }else setIsZomoto(false)
      
      setProduct(prev=>({
        ...prev,
        userId:data._id
      }))

      Services.categories().then((res)=>{
        setCategoryList(res)
      }).catch((err)=>{console.log(err);})

      Services.getProducts(isZomoto,data._id).then((res)=>{
        
        setProductList(res)
        console.log(res);
 
      }).catch((err)=>console.log(err))

    },[no])

    const handleChange=(e,k)=>{

      setProduct(prev=>({
        ...prev,
        [k]:e
      }))

    }

    const submitProduct=()=>{

      setProduct(prev=>({
        ...prev,
        userId:data._id
      }))

      console.log(product);

      if(product.productImg.length<1||product.productCategory.length<1||product.productName.length<4||
        product.productDiscountedPrice.length<1||product.productOriginalPrice.length<1){

          setTitle('Invalid Details')
          setContent("Please Enter minimum 4 char product Name, delect category,pick image enter both price")
          setError(true)
      }else{

        if(isUpdate){

          product._id=productId
          
          Services.updateProduct(product).then((res)=>{
            console.log('update');
          setIsOpen(false)
          setIsUpdate(false)
          clearProduct()
          }).catch((err)=>{

            setTitle('Something Went Wrong')
            setContent("Server Error")
            setError(true)

          })

        }else{

        Services.addProduct(product).then((res)=>{
          console.log(res);
          setIsOpen(false)
          setIsUpdate(false)
          clearProduct()
        }).catch((err)=>{

          setTitle('Something Went Wrong')
          setContent("Server Error")
          setError(true)

        })
      }

      }

    }

    const errorClose=()=>setError(false)

    const closeModal=()=>{
      setIsOpen(false)
      setIsUpdate(false)
      clearProduct()
    }

    const updateProduct=(id)=>{

      setIsUpdate(true)

      setProductId(id)

      Services.getProduct(id).then((res)=>{
       
        console.log(res);
        setProduct({
          productName:res.productName,
          productOriginalPrice:res.productOriginalPrice,
          productDiscountedPrice:res.productDiscountedPrice,
          productImg:res.productImg,
          productDescription:res.productDescription,
          productMaxQty:res.productMaxQty,
          productMinQty:res.productMinQty,
          productStock:res.productStock,
          productActive:res.productActive,
          productCategory:res.productCategory,
          userId:res.userId,
        })

        setIsOpen(true)

      }).catch(err=>{
        setTitle('Something Went Wrong')
        setContent("Server Error")
        setError(true)
      })

    }

    return(
        <>
          {
            user.no!==undefined?
            <>
               {
                user.no!=='7741943487'?
                   <PlusProduct 
                   title={'Products'} 
                   name='product' 
                   open={()=>setIsOpen(true)}/>
                :null
               }
               <BasicModal isOpen={isOpen} isProduct={true}>
                <Typography variant='h6' style={{textAlign:'center'}}>
                  {isUpdate?'Update ':'Add '} 
                  Product</Typography>
                <Grid container item xs={12} md={12} spacing={2} style={{marginTop:'15px'}}>
                  <Grid container item xs={6} md={6} spacing={2}>
                    <Grid item xs={12} md={12}>
                      {
                        product.productImg.length>0?
                        <img src={product.productImg} style={{width:'80px',height:'60px'}}/>
                        :null
                      }
                    </Grid>
                    <Grid item xs={12} md={12}>
                       <ImageUpload
                       imgUrl={(u)=>handleChange(u,'productImg')}
                       />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField 
                       required
                       type='text'
                       label='Product Name'
                       fullWidth
                       size='small'
                       value={product.productName}
                       onChange={(e)=>handleChange(e.target.value,'productName')}
                       />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                      <Select
                       labelId="demo-simple-select-label"
                       size='small'
                       label="Select Category"
                       id="demo-simple-select"
                       value={product.productCategory}
                       required
                       onChange={(e)=>handleChange(e.target.value,'productCategory')}
                      >
                      {
                        categoryList.map((i,index)=>{
                          return <MenuItem value={i._id} key={i._id}>{i.categoryName}</MenuItem>
                        })
                      }
                     </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField 
                       type='number'
                       required
                       label='Product Original Price'
                       fullWidth
                       size='small'
                       value={product.productOriginalPrice}
                       onChange={(e)=>handleChange(e.target.value,'productOriginalPrice')}
                       />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField 
                       type='number'
                       required
                       label='Product Discounted Price'
                       fullWidth
                       size='small'
                       value={product.productDiscountedPrice}
                       onChange={(e)=>handleChange(e.target.value,'productDiscountedPrice')}
                       />
                    </Grid>
                  </Grid>
                  <Grid container item xs={6} md={6} spacing={2}>
                  <Grid item xs={12} md={12}>
                      <TextField 
                       type='number'
                       label='Product In Stock'
                       fullWidth
                       size='small'
                       value={product.productStock}
                       onChange={(e)=>handleChange(e.target.value,'productStock')}
                       />
                    </Grid>
                  <Grid item xs={12} md={12}>
                      <TextField 
                       type='number'
                       label='Min Qty'
                       fullWidth
                       size='small'
                       value={product.productMinQty}
                       onChange={(e)=>handleChange(e.target.value,'productMinQty')}
                       />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField 
                       type='number'
                       label='Max Qty'
                       fullWidth
                       size='small'
                       value={product.productMaxQty}
                       onChange={(e)=>handleChange(e.target.value,'productMaxQty')}
                       />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextareaAutosize
                       type='text'
                       placeholder='Product Description'
                       style={{height:'70px',width:'100%'}}
                       size='small'
                       value={product.productDescription}
                       onChange={(e)=>handleChange(e.target.value,'productDescription')}
                       />
                    </Grid>
                    <Grid style={{marginLeft:'15px'}}>
                    <FormLabel id="demo-radio-buttons-group-label">Product Active</FormLabel>
                     <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue={product.productActive}
                      name="radio-buttons-group"
                      onChange={(e)=>{handleChange(e.target.value,'productActive')}}
                      >
                       <FormControlLabel value={true} control={<Radio />} label="Active" />
                       <FormControlLabel value={false} control={<Radio />} label="InActive" />
                     </RadioGroup>
                    </Grid>
                  </Grid>
                  <Grid item container xs={12} md={12}>
                    <Grid item xs={6} md={6}>
                       <Button
                       onClick={closeModal}
                      fullWidth>Cancel</Button>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Button onClick={submitProduct} 
                      style={style.btnColor}
                      fullWidth>{isUpdate?'Update':'Add'} Product</Button>
                    </Grid>
                  </Grid>
                </Grid>
                <AlertDialogSlide isOpen={isError} content={content} title={title} close={errorClose}/>
               </BasicModal>
               <Grid container spacing={1} item xs={12} md={12} style={{marginTop:'10px'}}>
                {
                  productList.map((i,index)=>{
                    return <Grid item xs={4} md={3} key={index}> 
                    <ProductCart 
                    imgUrl={i.productImg} 
                    title={i.productName} id={i._id}
                    update={updateProduct}/>
                    </Grid>
                  })
                }
               </Grid>
            </>
            :
            null
          }
        </>
    )

}


export default Products