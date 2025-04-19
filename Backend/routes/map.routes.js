const express=require('express');
const router=express.Router();
const mapController=require('../controller/map.controller');

const {body}=require('express-validator');

router.get('/autosuggest',
    mapController.autosuggest
);

module.exports=router;