const MacaddressValidation = (req, res, next) => {
    if(!req.body.macaddress){ // se o macaddress não existe retorna uma mensagem de erro
        return res.status(400).json({error: 'Favor informar o macaddress do dispositivo'});
    } else { //caso o macaddress exista, vai para a proxima função
        next();
    }
};

module.exports = MacaddressValidation;