import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import 'bootstrap/dist/js/bootstrap.js';
import "../App.css"
//import ScrollBars from 'react-scrollbar';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

function AdminProductList() {
    const [adminProductList, setAdminProductList] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const slicedProducts = adminProductList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    slicedProducts.map((item) =>
    console.log(item));
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

    useEffect(()=>{
        Axios.get('http://localhost:4000/api/admin/product',{
            headers: {
                "x-access-token": localStorage.getItem("accessToken"),
            },
            withCredentials: true,
        }).then((response)=>{
            setAdminProductList(response.data)
        });
      }, []);


    const deleteItem = (_id) => {
        Axios.delete(`http://localhost:4000/api/admin/product/delete/${_id}`,{
            headers: {
                "x-access-token": localStorage.getItem("accessToken"),
            },
            withCredentials: true,
        }).then((response)=>{
            getAdminProductList() 
        })
    }

    const getAdminProductList = () => {
        Axios.get('http://localhost:4000/api/admin/product',{
            headers: {
                "x-access-token": localStorage.getItem("accessToken"),
            },
            withCredentials: true,
        }).then((response)=>{
            setAdminProductList(response.data)
        });
    }

    const closeFailAlert = () => {
        var failMessage = document.getElementById('patchItemFail');
        failMessage.style.display = 'none';
    }
    const scrollBarStyle = {
      height: '20px',
    };

    return (
        <div className="container adminlist">
            <div>
                <h3>Product List</h3>
            </div>
            <div className='d-flex'>
                <a href="/addProduct" className="btn btn-primary my-3 mx-1">Add New Item</a>
            </div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                 <TableContainer sx={{ maxHeight: 1500 }}>
                <Table stickyHeader className="table table-striped table-hover table-bordered border border-5 my-5" id="todos-table">
                    <TableHead className="text-center">
                        <TableRow>
                            <th>Item Name</th>
                            <th>Item Description</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                       {slicedProducts.map((item) => { return (
                                        <TableRow style={{maxHeight: 120, overflow:"auto"}} key={item._id}>
                                            <TableCell><div style={{maxHeight:120, overflow:"auto"}}>{item.name}</div></TableCell>
                                            <TableCell><Paper style={{maxHeight:120, overflow:"auto"}}>{item.description}</Paper></TableCell>
                                            <TableCell><Paper style={{maxHeight:120, overflow:"auto"}}>{item.price.toFixed(2)}</Paper></TableCell>
                                            <TableCell className="text-center"><Paper >
                                                <a href={"/editProduct/" + item._id} className="btn btn-secondary">Edit</a>
                                                <button className="btn btn-danger" onClick={()=>{deleteItem(item._id)}}>Delete</button>
                                            </Paper></TableCell>
                                        </TableRow>
                                        );
                                    }
                                    )

                        }
                    </TableBody>
                </Table>

                </TableContainer>
                 <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={adminProductList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
            </Paper>
        </div>
    );
}

export default AdminProductList;