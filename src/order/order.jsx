import React,{Component} from "react";
import Services from "../services";

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

class Orders extends Component{

    constructor(){
        super()
        this.state={
            products :[],
            order:[],
            address:[]
        }
    }

    getOrders(){

      const seller = Services.getSeller()

      Services.getData('orders/sellerId/'+seller._id).then((res)=>{

        this.setState({
          ...this.state,
          order:res
        })

        const product = res.map((i)=>{

          return Services.getData('products/product/'+i.productId).then((res)=>{

            return res

          })

        })

        Promise.all(product).then((res)=>{

          this.setState({
            ...this.state,
            products:res
          })

        })

        const address = res.map((i)=>{

          return Services.getData('address/'+i.addressId).then((res)=>{

            return res

          })

        })

        Promise.all(address).then((res)=>{

          this.setState({
            ...this.state,
            address:res
          })

        })

      })

    }

    componentDidMount(){

        this.getOrders()

    }


    render(){

        console.log(this.state);

        const {products,address,order} = this.state

        return(
            <div style={{
                marginTop:'10%'
            }}>
               {CustomizedTables(products,address,order)}
            </div>
        )

    }

}


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

/*function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];*/

 function CustomizedTables(products,address,order) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Product Name</StyledTableCell>
            <StyledTableCell align="right">Product Image</StyledTableCell>
            <StyledTableCell align="right">Product Price</StyledTableCell>
            <StyledTableCell align="right">Quantity</StyledTableCell>
            <StyledTableCell align="right">Total</StyledTableCell>
            <StyledTableCell align="right">Customer Name</StyledTableCell>
            <StyledTableCell align="right">Customer Address</StyledTableCell>
            <StyledTableCell align="right">Landmark</StyledTableCell>
            <StyledTableCell align="right">Customer No</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody> 
          {products.map((product,index) => (
            <StyledTableRow key={product._id}>
              <StyledTableCell component="th" scope="row">
                {product.productName}
              </StyledTableCell>
              <StyledTableCell align="center">
                <img src={product.productImg} 
                style={{
                    width:'50px',
                    height:'50px'
                }}
                />
              </StyledTableCell>
              <StyledTableCell align="right">{order.price}</StyledTableCell>
              <StyledTableCell align="right">row.carbs</StyledTableCell>
          <StyledTableCell align="right">row.protein</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}



export default Orders