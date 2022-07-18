import React,{Component} from 'react'
import PlusProduct from '../Reusable/plusProduct'
import BasicModal from '../Reusable/model'
import { Button, Grid, TextField, Typography,RadioGroup,FormControlLabel,Radio, formLabelClasses } from '@mui/material'
import ImageUpload from '../Reusable/imageUpload/imageUpload'
import AlertDialogSlide from '../Reusable/dialog/dialog'
import Services from '../services'
import ProductCart from '../Reusable/productCart'

const style={
    page:{
        marginTop:'20px'
    },
    center:{
        textAlign:'center'
    },
    rdioBtn:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    btnColor:{
        backgroundColor:'#cb202d',
        color:'white'
    }
}

class Categories extends Component{
    constructor(){
        super()
        this.state={
            isOpen:false,
            imgUrl:'',
            categoryName:'',
            isActive:true,
            categoryDescription:'',
            isError:false,
            title:'',
            content:'',
            categories:[],
            id:'',
            isUpdate:false
        }
        this.openModel=this.openModel.bind(this)
        this.closeModel=this.closeModel.bind(this)
        this.imageUrl=this.imageUrl.bind(this)
        this.submitCategory=this.submitCategory.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.updateCategory=this.updateCategory.bind(this)
    }

    componentDidMount(){
        Services.categories().then((res)=>{
            
            this.setState({
                ...this.state,
                categories:res
            })

        }).catch((err)=>{
            console.log(err);
        })
    }

    openModel(){
        this.setState({
            ...this.state,
            isOpen:true
        })
    }

    closeModel(){
        this.setState({
            ...this.state,
            isOpen:false,
            categoryName:'',
            categoryDescription:'',
            isActive:true,
            imgUrl:'',
            id:'',
            isUpdate:false
        })
    }


    imageUrl(url){

        this.setState({
            ...this.state,
            imgUrl:url
        },()=>{
            console.log(this.state.imgUrl);
        })

    }

    handleChange(e,k){
        this.setState({
            ...this.state,
            [k]:e
        })
    }

    submitCategory(){

        if(this.state.categoryName<4||this.state.imgUrl.length<1){
            this.setState({
                ...this.state,
                isError:true,
                title:'Invalid Details',
                content:'categoryName have 4 charecters and select category image'
            })
        }else{
            this.setState({
                ...this.state,
                isError:false,
                title:'',
                content:''
            })

            const category={
                categoryName:this.state.categoryName,
                categoryDescription:this.state.categoryDescription,
                isActive:this.state.isActive,
                imgUrl:this.state.imgUrl
            }


            if(this.state.isUpdate){
                category._id=this.state.id
                 Services.updateCategory(category).then((res)=>{
                    console.log(res);
                    this.closeModel()
                 }).catch((err)=>{
                    this.setState({
                        ...this.state,
                        title:'Something Went Wrong',
                        content:'Server Error Please Try After Some Time',
                        isError:true
                    })
                 })
            }else{

            Services.addCategory(category).then((res)=>{

                this.closeModel()

                console.log(res);

            }).catch((err)=>{
                this.setState({
                    ...this.state,
                    title:'Something Went Wrong',
                    content:'Server Error Please Try After Some Time',
                    isError:true
                })
            })
        }

        }

    }

    alertClose(){
        this.setState({
            ...this.state,
            isError:false
        })
    }

    updateCategory(id,name,description,imgUrl,isActive){

        this.setState({
            ...this.state,
            id:id,
            categoryName:name,
            imgUrl:imgUrl,
            categoryDescription:description,
            isActive:isActive,
            isOpen:true,
            isUpdate:true
        })

    }


    render(){
        return(
            <>
               <div style={style.page}>
                <PlusProduct title='Categories' name='categorie' open={this.openModel}/>
               </div>
               <Grid container item xs={12} md={12} xl={12} style={{marginLeft:'15px',marginTop:'20px'}}>
               {
                this.state.categories.length>0?
                   this.state.categories.map((i,index)=>{
                    return <Grid item key={index} xs={6} md={4} xl={3}>
                        <ProductCart title={i.categoryName} imgUrl={i.imgUrl}
                        description={i.categoryDescription} isActive={i.isActive} id={i._id}
                        update={(id,name,description,imgUrl,isActive)=>this.updateCategory(id,name,description,imgUrl,isActive)}/>
                    </Grid>
                   })
                :null
               }
               </Grid>
               <BasicModal isOpen={this.state.isOpen} close={this.closeModel}>
                <Grid container item gap={'15px'} xs={12} md={12}>
                    <Grid item xs={12} md={12}>
                        <Typography style={style.center}>
                            {this.state.isUpdate?'Update ':'Add '}
                            Category</Typography>
                    </Grid>
                    <Grid item xs={12} md={12} style={{gap:'10px'}}>
                        {
                            this.state.imgUrl.length>0?
                            <img src={this.state.imgUrl} style={{height:'80px',width:'80px'}}/>:
                            null
                        }
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <ImageUpload imgUrl={(ur)=>this.imageUrl(ur)} img={this.state.imgUrl}/>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField fullWidth size='small' label='Category Name'
                        value={this.state.categoryName}
                        onChange={(e)=>this.handleChange(e.target.value,'categoryName')}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField fullWidth size='small' label='Category description'
                        value={this.state.categoryDescription}
                        onChange={(e)=>this.handleChange(e.target.value,'categoryDescription')}
                        />
                    </Grid>
                    <Grid>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={this.state.isActive}
                        name="radio-buttons-group"
                        style={style.rdioBtn}
                        onChange={(e)=>this.handleChange(e.target.value,'isActive')}
                     >
                         <FormControlLabel value={true} control={<Radio />} label="Active" />
                         <FormControlLabel value={false} control={<Radio />} label="Inactive" />
                    </RadioGroup>
                    </Grid>
                    <Grid item xs={12} md={12} container>
                        <Grid item xs={8} md={8} >
                            <Button onClick={this.closeModel}>Cancel</Button>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Button onClick={this.submitCategory} fullWidth style={style.btnColor}>
                                {this.state.isUpdate?'Update ':'Add '}Category
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <AlertDialogSlide 
                title={this.state.title} 
                content={this.state.content}
                isOpen={this.state.isError}
                close={this.alertClose.bind(this)}
                />
               </BasicModal>
            </>
        )

    }

}

export default Categories