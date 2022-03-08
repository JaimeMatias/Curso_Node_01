const { response } = require('express');
const path = require('path');
const { nextTick } = require('process');
const cargar_archivo = async (req, res) => {


    if (!req.files.archivo || !req.files || Object.keys(req.files).length === 0) {
        res.status(400).json({ msg: 'No files were uploaded.' });
        return;
    }

    console.log('req.files >>>', req.files); // eslint-disable-line

    const { archivo } = req.files;
    const nombreCortado = archivo.name.split('.')
    const extension = nombreCortado[nombreCortado.length - 1]
    
    const extensionesValidas=['png','jpg','jpeg','gif']
    if (!extensionesValidas.includes(extension)){
        res.status(400).json({
            msg:`La extesnión ${extension} no es permitida` 
        })
    }else{
        res.json({
            msg:'extension valida'
        })
    }

    // const uploadPath = path.join(__dirname,'../uploads/',archivo.name);

    // archivo.mv(uploadPath, (err) => {
    //     if (err) {
    //         return res.status(500).json({ err });
    //     }

    //     res.json({ msg: 'File uploaded to ' + uploadPath });
    // });

}

module.exports = {
    cargar_archivo,
}