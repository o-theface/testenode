var express=require("express");
var app= express();

var sinesp = require('sinesp-nodejs');

app.use('/placa/:q' , async (req, res) => {    
    try {        
        var placa = "EDQ5751";
        console.log(req.params);
        if (req.params.q != undefined) {placa = req.params.q;}
        console.log(placa);

        const dados = await sinesp.consultaPlaca(placa);
        if (dados.codigoRetorno = '0') {
            res.json({
                "content" : {
                    "type" : "text",
                    "text" : "\nPlaca: " + dados.placa +
                             "\nModelo: " + dados.modelo +
                             "\nCor: " + dados.cor +
                             "\nAno: " + dados.ano +
                             "\nModelo: " + dados.anoModelo +
                             "\nLocal: " + dados.municipio + "-" + dados.uf +
                             "\nSituação: " + dados.situacao
                }
            })
        } else {
            res.json({
                "message":"Erro ao processar consulta", 
                "codigoRetorno": dados.codigoRetorno,
                "mensagemRetorno" : dados.mensagemRetorno});
        }

    } catch (dados) {
        console.log(dados);
        res.json({"message":"Erro ao processar consulta", dados});
    }
});

app.listen(8080, function() {
    console.log('Example app listening on port 8080!');
});