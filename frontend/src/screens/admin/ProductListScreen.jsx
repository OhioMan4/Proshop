import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Box } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { listProducts, deleteProduct, createProduct } from '../../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants'
import Loader from '../../components/shared/Loader'
import Message from '../../components/shared/Message'

const ProductListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { loading, error, products } = useSelector((state) => state.productList)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = useSelector((state) => state.productDelete)
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = useSelector((state) => state.productCreate)
  const { userInfo } = useSelector((state) => state.userLogin)

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })
    if (!userInfo?.isAdmin) return navigate('/login')
    if (successCreate) return navigate(`/admin/product/${createdProduct._id}/edit`)
    dispatch(listProducts())
  }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct])

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant='h4'>Products</Typography>
        <Button variant='contained' startIcon={<AddIcon />} onClick={() => dispatch(createProduct())}>Create Product</Button>
      </Box>
      {loadingDelete && <Loader />}
      {errorDelete && <Message severity='error'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message severity='error'>{errorCreate}</Message>}
      {loading ? <Loader /> : error ? <Message severity='error'>{error}</Message> : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>NAME</TableCell>
              <TableCell>PRICE</TableCell>
              <TableCell>CATEGORY</TableCell>
              <TableCell>BRAND</TableCell>
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product._id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>
                  <IconButton component={Link} to={`/admin/product/${product._id}/edit`} size='small'><EditIcon /></IconButton>
                  <IconButton onClick={() => dispatch(deleteProduct(product._id))} size='small' color='error'><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  )
}

export default ProductListScreen
