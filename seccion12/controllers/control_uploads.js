const { response } = require('express');
const path = require('path');
const { nextTick } = require('process');
const {v4:uuidv4}=require('uuid');
const {subir_archivo}=require('../helper');

const cargar_archivo = async (req, res) => {


    if (!req.files.archivo || !req.files || Object.keys(req.files).length === 0) {
        res.status(400).json({ msg: 'No files were uploaded.' });
        return;
    }

const patCompleto=await subir_archivo(req.files);
res.json({patCompleto})

}

module.exports = {
    cargar_archivo,
}