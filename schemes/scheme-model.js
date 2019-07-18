const db = require('../db-config');

module.exports = {
    addStep,
    find,
    findById,
    findSteps,
    findStepById,
    add,
    update,
    remove,
    removeStep
}


function find(){
    return db('schemes');
}

function findById(id){
    return db('schemes')
    .where({id})
    .first()
    .then(scheme =>{
        if(scheme){
            return scheme;
        }else{
            return null;
        }
    });
}

function findSteps(){
    return db('schemes as s')
    .innerJoin('steps as st', 's.id', 'st.scheme_id')
}

function findStepById(id){
    console.log(id)
    return db('schemes as s')
    .innerJoin('steps as st', 's.id', 'st.scheme_id')
    .where({id})
    .first()
    .then(step =>{
        if(step){
            return step;
        }else{
            return null;
        }
    });
}

function add(data){
    return db('schemes').insert(data);
}


function remove(id){
    return db('schemes')
    .where({id})
    .del();
}

function update(data, id){
    return db('schemes').update(data)
    .where({id})
    ;
}




//not working
function addStep(data, id){
    return db('schemes').insert(data);
}

// not working
function removeStep(id){
    console.log(id)
    return db('schemes as s')
    .innerJoin('steps as st', 's.id', 'st.scheme_id')
    .where({id})
    .del();
}