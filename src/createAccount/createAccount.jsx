import React,{Component} from 'react'
import { Container,Box } from '@mui/system'
import { TextField,Grid, Typography,Select,MenuItem,FormControl,InputLabel, Button,Link,TextareaAutosize } from '@mui/material'
import Services from '../services/service'
import AlertDialogSlide from '../Reusable/dialog'


const style={
    grid:{
        width:'80%',
        marginLeft:'5%',
        marginTop:'5%',
        border:'2px solid black',
        paddingLeft:'6%',
        paddingRight:'6%',
        paddingTop:'3%',
        paddingBottom:'6%',
        borderRadius:'15px',
        backgroundColor:'whiteSmoke'
    },
    center:{
      textAlign:'center'
    },
    btn:{
      marginTop:'10px',
      backgroundColor:'#cb202d'
    },
    link:{
      textAlign:'center',
      marginTop:'5px',
      color:'red'
    }
}

class CreateAccount extends Component{

   constructor(){
      super()
      this.state={
         city:['AURANGABAD','SILLOD',"KANNAD","MALEGOAN","PUNE","MUMBAI"],
         selectedCity:'',
         address:'',
         hotelName:'',
         no:'',
         email:'',
         email:'',
         password:'',
         repassword:'',
         noIsAble:false,
         isValidDetails:true,
         dialogOpen:false,
         description:''
      }

      this.handleChange=this.handleChange.bind(this)
      this.noCheck=this.noCheck.bind(this)
      this.handleSubmit=this.handleSubmit.bind(this)
      this.closeDialog=this.closeDialog.bind(this)

   }

   noCheck(){

      Services.isAble(this.state.no).then((res)=>{

         console.log(res)

         if(res!==0){
            this.setState({
               ...this.state,
               noIsAble:true,
               dialogOpen:true
            })
         }else{
            this.setState({
               ...this.state,
               noIsAble:false,
               dialogOpen:false
            })
         }

      }).catch((err)=>console.log(err))

   }

   closeDialog(){
      this.setState({
         ...this.state,
         dialogOpen:false
      })
   }


   handleChange(e,k){

      this.setState({
         ...this.state,
         [k]:e.target.value
      },()=>{
         if(k==='no'&&e.target.value.length===10){
            this.noCheck()
         }else{
            this.setState({
               ...this.state,
               noIsAble:false
            })
         }
         if(this.state.hotelName.length>4&&this.state.address.length>4&&this.state.email.length>1&&
            this.state.password===this.state.repassword&&!this.state.noIsAble&&this.state.password.length>7&&
            this.state.repassword.length>7&&this.state.no.length===10){

               console.log('right');

               this.setState({
                  ...this.state,
                  isValidDetails:false
               })

            }else{
               console.log('hire');
               this.setState({
                  ...this.state,
                  isValidDetails:true
               })
            }
      })

   }


   cityChange(e){

      this.setState({
         ...this.state,
         selectedCity:e.target.value
      })

   }

   handleSubmit(){

      const newAccount ={
            hotelName:this.state.hotelName,
            no:this.state.no,
            description:this.state.description,
            email:this.state.email,
            password:this.state.password,
            address:this.state.address,
            city:this.state.selectedCity
        }

      Services.newAccount(newAccount).then((res)=>{

         console.log(res);

      }).catch((err)=>{
         console.log(err);
      })

   }

    render(){
        return(
         <>
            <div style={style.grid}>
               <Grid>
               <h2 style={style.center}>Create Account</h2>
               </Grid>
              <Grid item container spacing={6}>
               <Grid item container spacing={6}>                
                  <Grid xs={12} md={6} container item spacing={2} gap='10px'>
                    <Grid item xs={12} md={12}>
                       <TextField fullWidth variant='outlined' size='small' label='Hotel Name'
                       value={this.state.hotelName} onChange={(e)=>this.handleChange(e,'hotelName')}/>
                    </Grid>
                    <Grid item xs={12} md={12}>
                       <TextField fullWidth variant='outlined' size='small' label='Address'
                       value={this.state.address} onChange={(e)=>this.handleChange(e,'address')}/>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">City</InputLabel>
                       <Select 
                       labelId="demo-simple-select-label"
                       id="demo-simple-select"
                       value={this.state.selectedCity}
                       label="Age"
                       size='small'
                       onChange={(e)=>this.handleChange(e,'selectedCity')}>
                            {
                              this.state.city.map((i,index)=>{
                                 return <MenuItem value={i} key={index}>{i}</MenuItem>
                              })
                            }
                       </Select>
                       </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextareaAutosize
                       aria-label="minimum height"
                       minRows={3}
                       placeholder="Description"
                       style={{ width: '100%',height:'70px' }}
                       value={this.state.description}
                       onChange={(e)=>this.handleChange(e,'description')}
                       />
                    </Grid>
                </Grid>
                <Grid xs={12} md={6} container item spacing={2} gap='10px'>
                    <Grid item xs={12} md={12}>
                       <TextField fullWidth variant='outlined' size='small' type='number' label='Mobile No'
                       value={this.state.no} onChange={(e)=>this.handleChange(e,'no')}/>
                    </Grid>
                    <Grid item xs={12} md={12}>
                       <TextField fullWidth variant='outlined' size='small' type='email' label='Email'
                       value={this.state.email} onChange={(e)=>this.handleChange(e,'email')}/>
                    </Grid>
                    <Grid item xs={12} md={12}>
                       <TextField fullWidth variant='outlined' size='small' type='password' label='Enter password'
                       value={this.state.password} onChange={(e)=>this.handleChange(e,'password')}/>
                    </Grid>
                    <Grid item xs={12} md={12}>
                       <TextField fullWidth variant='outlined' size='small' type='password' label='Re-Enter password'
                       value={this.state.repassword} onChange={(e)=>this.handleChange(e,'repassword')}/>
                    </Grid>
                </Grid>
                </Grid>
              </Grid>
              <Grid>
                  <Button onClick={this.handleSubmit} style={style.btn} disabled={this.state.isValidDetails} fullWidth variant='contained'>Create</Button>
               </Grid>
               <Grid style={style.link}>
                   <Link href='http://localhost:3000/login'>Login</Link>
               </Grid>
            </div>
            <Grid style={style.grid} xs={12} md={12} item>
               <h3 style={style.center}>Account Rules</h3>
               <h6>Hotel Name have minimum 4 charecters</h6>
               <h6>Address have minimum 4 charecters</h6>
               <h6>Enter Valid No</h6>
               <h6>Enter Valid Email</h6>
               <h6>Password and Repassword are same</h6>
            </Grid>
            <AlertDialogSlide content={this.state.no+' is Already available please login or change No'}
            title={this.state.no+' Is Available'} isOpen={this.state.dialogOpen} close={this.closeDialog}/>
         </>
        )
    }
}

export default CreateAccount