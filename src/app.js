const express = require("express")
const fs = require("fs")

const { randomUUID } = require("crypto")
const { response } = require("express")

const app = express()

app.use (express.json())
let products = []

fs.readFile("products.json", "utf-8",  (err, data ) => {
  if (err) {
    console.log(err)
} else {
  products = JSON.parse(data)
 }
})

app.post("/products" , (req , res) =>{
  const {name , price} = req.body

  const product = {
    name,
    price,
    id: randomUUID(),
  }

  products.push(product)
  fs.writeFile("products.json" , JSON.stringify(products), (err) =>{
    if(err){
      console.log(err)
    } else {
      console.log("Produto inserido")
    }
  })

  return res.json(product)
})

app.get("/products", (req, res) => {
  return res.json(products)
})

app.get("/products/:id", (req,res) =>{
  const { id} = req.params
  const product = products.find(product => product.id === id)
  return response.json(product)
})
app.put("/products/:id", (req,res) => {
  const{id} = req.params
  const { name, price } = req.body

  const productIndex = products.findIndex((product) => product.id === id)
  products[productIndex] = {
    ...products[productIndex],
    name,
    price,
  }
  productFile()

  return res.json({message:"Produto alterado com sucesso"})

})
app.delete("/products/:id", (req, res) => {
  const{ id } = req.paragrams
  const productIndex = products.findIndex((product) =>
  product.id === id) 
  products.splice(productIndex, 1)
  productFile()
  return res.json({message:"product"})
  

  }
  )
  function productFile(){
    fs.writeFile("products.json" , JSON.stringify(products), (err) =>{
      if(err){
        console.log(err)
      } else {
        console.log("Produto inserido")
      }
  }
)}

app.listen( 4002, () => console.log("Server is running in port 4002"))

