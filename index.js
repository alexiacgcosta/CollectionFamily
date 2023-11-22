const express = require('express');
const mongoose = require('mongoose');
const familiaModel = require('./src/model/familia');
const app = express();

app.use(express.json());


app.post( '/familias' , async (req,res) => {
  // metodo create 
  // const response = await familiaModel.create({
  //   nome: req.body.nome,
  //   idade: req.body.idade,
  //   profissao: req.body.profissao
  // })

  //metodologia de instanciar classe
  const membro = new familiaModel()
  membro.nome = req.body.nome;
  membro.idade = req.body.idade;
  membro.profissao = req.body.profissao;
  const response = await membro.save();

  return res.status(200).json({
    data: response
  })
})

app.get('/familias', async (req, res) => {
  if (req.query.idade) {
    const membros = await familiaModel.find({}).where('idade').gt(req.query.idade)
    // || const membros = await familiaModel.find({}).gt('idade', req.query.idade)

    return res.status(200).json({
      data: membros
    })
  }

  const membros = await familiaModel.find({})

  return res.status(200).json({
    data: membros
  })
})

app.get('/familias/:id', async (req, res) => {
  try{
  const membro = await familiaModel.findById(req.params.id)
  return res.status(200).json({
    data: membro
  }) 
} catch (error) {
    return res.status(400).json({
      data: {},
      message: 'Não foi possível encontrar esse ID'
    })
  }
})

app.put('/familias/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      data: {},
      message: 'Não é um ID válido'
    })
  }
  const membro = await familiaModel.updateOne({_id: req.params.id}, req.body)

  return res.status(200).json({
    data: membro
  })
})

app.delete('/familias/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      data: {},
      message: 'Não é um ID válido'
    })
  }
  const membro = await familiaModel.deleteOne({_id: req.params.id})

  return res.status(200).json({
    data: membro})  
  }
)

app.listen(8080, () => {
  console.log('Servidor operacional')
})