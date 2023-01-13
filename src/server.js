const http = require('http')

http.createServer((req,res) => {
  res.writeHead(200, {'Content-Type': 'application/json'})
   
   {
    if(req.url === "/usuarios"){
      res.end(JSON.stringify ({
        message: "Rota de usuario"})      
    )
  }
} 
{
  if(req.url === "/produto"){
    res.end(JSON.stringify ({
      message: "Rota de produto"})      
    )
  }
} 
res.end(JSON.stringify({
  message:"qualquer outra rota"
})
)
}).listen(4001 , () =>  console.log("O servidor esta rodando na porta 4001"))