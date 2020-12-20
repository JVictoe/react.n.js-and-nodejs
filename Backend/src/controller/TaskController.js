const { response } = require('express');
const TaskModel = require('../model/TaskModel');

class TaskController {

    async create(req, res) { //cria uma nova tarefa no banco de dados
        const task = new TaskModel(req.body);
        await task
                    .save() //tenta salvar um registro
                    .then(response => {
                        return res.status(200).json(response);
                    }) //se tudo der certo
                    .catch( error => {
                        return res.status(500).json(error);
                    }); //se der algo de errado
    }

    async update(req, res) { //atualiza uma tarefa
        await TaskModel.findByIdAndUpdate({'_id': req.params.id}, req.body, {new: true} )
                                    .then(response => {
                                        return res.status(200).json(response);
                                    })
                                    .catch(error => {
                                        return res.status(500).json(error);
                                    });
    }

}

module.exports = new TaskController();