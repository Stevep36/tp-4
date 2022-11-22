import express from "express";
import ContenedorProductos from "./services/ContenedorProductos.js";

const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
let productos = new ContenedorProductos;

//para poder usar el json en los parseos del body
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/api/productos/listar', (req, res)=>{
    
    productos.getAllProducts();
    if (productos.getLength() > 0) 
        res.send( {productos: productos})
    else res.send({error: "no hay productos cargados"})
})



app.get('/api/productos/listar/:id', (req, res)=>{
    let id = req.params.id-1;
    if (id < productos.getLength() && id !== -1) { 
        res.send ({producto: productos.getProducto(id)});
    }else res.send({error:'producto no encontrado'});

})



app.post('/api/productos/guardar', (req, res)=>{
    let {title,price,thumbnail} = req.body
    productos.saveProduct({title,price,thumbnail});
    res.send({message: "Producto Incorporado"});
})


