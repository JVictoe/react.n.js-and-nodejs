const { response } = require('express');
const TaskModel = require('../model/TaskModel');
const {startOfDay, endOfDay, startOfWeek,
    endOfWeek, startOfMonth, endOfMonth,
    startOfYear, endOfYear} = require('date-fns')

const current = new Date(); //guarda a hora e dia atual

class TaskController { //classe para criar as funções 

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

    async all(req, res) { //busca todas as tarefas filtrando pelo macadress para mostrar as tarefas só do celular da pessoas
        await TaskModel.find({macaddress: {'$in' : req.params.macaddress}})
                    .sort('when')
                    .then(response => {
                        return res.status(200).json(response);
                    })
                    .catch(error => {
                        return res.status(500).json(error);
                    });
    }

    async show(req, res){
        await TaskModel.findById(req.params.id)
            .then(response =>{
                if(response){
                    return res.status(200).json(response);
                } else {
                    return res.status(404).json({error: 'Tarefa não encontrada'});
                }
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }

    async delete(req, res){
        await TaskModel.deleteOne({'_id': req.params.id})
            .then(response =>{
                return res.status(200).json(response);
            })
            .catch(error =>{
                return res.status(500).json(error);
            });
    }

    async done(req, res){ //atualiza o done se a tafera foi concluida
        await TaskModel.findByIdAndUpdate(
            {'_id': req.params.id},
            {'done': req.params.done},
            {new: true})
            .then(response =>{
                return res.status(200).json(response);
            })
            .catch(error =>{
                return res.status(500).json(error);
            });
    }

    async late(req, res){ //mostra as tarefas atrasadas filtrando por macaddress para listar so do dispositivo da pessoa
        await TaskModel.find({
            'when': {'$lt': current},
            'macaddress' : {'$in' : req.params.macaddress}
        })
        .sort('when')
        .then(response =>{
            return res.status(200).json(response);
        })
        .catch(error =>{
            return res.status(500).json(error);
        });
    }

    async today(req, res){ //mostra as tarefas do dia atual
        await TaskModel.find({'macaddress' : {'$in': req.params.macaddress},
                                                'when': {'$gte' : startOfDay(current), '$lte' : endOfDay(current)}
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    async week(req, res){ //mostra as tarefas da semana atual
        await TaskModel.find({'macaddress' : {'$in': req.params.macaddress},
                                                'when': {'$gte' : startOfWeek(current), '$lte' : endOfWeek(current)}
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    async month(req, res){ //mostra as tarefas da semana atual
        await TaskModel.find({'macaddress' : {'$in': req.params.macaddress},
                                                'when': {'$gte' : startOfMonth(current), '$lte' : endOfMonth(current)}
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    async year(req, res){ //mostra as tarefas da semana atual
        await TaskModel.find({'macaddress' : {'$in': req.params.macaddress},
                                                'when': {'$gte' : startOfYear(current), '$lte' : endOfYear(current)}
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

}

module.exports = new TaskController();