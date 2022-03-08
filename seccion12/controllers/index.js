const CAuth=require('./control_auth')
const Buscar=require('./control_buscar')
const CCategoria=require('./control_categoria')
const CProducto=require('./control_producto')
const CUploads=require('./control_uploads')
const CUser=require('./control_user')

module.exports={
...CAuth,
...Buscar,
...CCategoria,
...CProducto,
...CUploads,
...CUser
}