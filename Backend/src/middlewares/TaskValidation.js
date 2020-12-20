const TaskModel = require('../model/TaskModel');
const { isPast } = require('date-fns');

const TaskValidation = async (req, res, next) => {

    const { macaddress, type, title, description, when } = req.body; //desistruturação

    if(!macaddress) {
        return res.status(400).json( { error: "macadress é obrigatório" });
    } else if (!type){
        return res.status(400).json({error: "tipo é obrigatório"})
    } else if (!title){
        return res.status(400).json({error: "titulo é obrigatório"})
    } else if (!description){
        return res.status(400).json({error: "descrição é obrigatório"})
    } else if (!when){
        return res.status(400).json({error: "data e hora são obrigatórios"})
    } else if(isPast(new Date(when))) { //verifica se a data está no passado
        return res.status(400).json({ error: "Escolha uma data e hora futura"});
    } else {
        let exists;

        if(req.params.id) {
            exists = await TaskModel.
                                    findOne(
                                        {'_id': {'$ne' : req.params.id}, //ignora o id da propira tarefa na verificação
                                        'when' : {'$eq': new Date(when)},
                                        'macaddress': {'$in' : macaddress}
                                    });
        } else {
            exists = await TaskModel.
                                findOne(
                                    {
                                        'when' : {'$eq': new Date(when)},
                                         'macaddress': {'$in' : macaddress}
                                    });
        }

        if(exists) {
            return res.status(400).json({error: "Já existe uma tarefa nesse dia e horário"});
        }
        

        next();
    }
} 
module.exports = TaskValidation;