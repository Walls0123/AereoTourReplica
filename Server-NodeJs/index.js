const express = require('express')
const bodyParser = require('body-parser');
const sql = require('mssql');
const http = require('http');
const fs=require('fs');

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});
app.listen(3001, function () {
    console.log('Example app listening on port 3001!')
})
//?Metods For AereoTour
app.post('/ping', function (req, res) {
    res.send(req.body);
    console.log(req.body)
})

app.get('/get/:search',(req,res)=>{
    //Get Params
    var config = {
        user: 'nodejs',
        password: 'golft0123',
        server: 'localhost', 
        database: 'aerotour' 
    };
    sql.connect(config).then(pool=>{

        return pool.request()
        .input('input',sql.VarChar(60),req.params.search)
        .execute('GetCiudadesFilters')
    }).then(result=>{
        let sendobjectname=[];
        for (let index = 0; index < result['recordset'].length; index++) {
            const element=result['recordset'][index]
            sendobjectname.push({'label':element.nombre.trim(),'value':element.codigo.trim()})
        }
        res.status(200).send({
            success:'true',
            mensaje:'datos filtrados',
            todos:(sendobjectname)
        })
        
    }).catch(err=>{
        res.send(err)
    })
    // let query=req.params.search;
    // let obj;
    // fs.readFile('db.json','utf8',function(err,data){
    //     if(err) throw err;
    //     obj=JSON.parse(data);
    //     let filterobjects= obj.filter(function(e){
    //         console.log(e.name.includes(query))
    //         return e.name.toUpperCase().includes(query.toUpperCase())
    //     })
    //     let sendobjectname=[];
    //     for (let index = 0; index < filterobjects.length; index++) {
    //         const element = filterobjects[index];
    //         sendobjectname.push({'label':element.name,'value':element.iata})
    //     }
    //     res.status(200).send({
    //         success:'true',
    //         mensaje:'datos filtrados',
    //         todos:(sendobjectname)
    //     })
    // })
})
