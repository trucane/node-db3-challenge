const express = require('express');

const Schemes = require('./scheme-model.js');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const schemes = await Schemes.find();
    res.json(schemes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get schemes' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const scheme = await Schemes.findById(id);

    if (scheme) {
      res.json(scheme);
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id.' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get schemes' });
  }
});

router.get('/:id/steps/:step_id', async (req, res) => {
  const { step_id } = req.params;

  try {
    const scheme = await Schemes.findStepById(step_id);

    if (scheme) {
      res.json(scheme);
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id.' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get steps' });
  }
});

router.get('/:id/steps', async (req, res) => {
  const { id } = req.params;

  try {
    const scheme = await Schemes.findById(id);

    if(scheme){
      const steps = await Schemes.findSteps(id);
  
      if (steps.length) {
        res.json(steps);
      } else {
        res.status(404).json({ message: 'Could not find steps for given scheme' })
      }
    }else{
      res.status(404).json({ message: 'Could not find this scheme' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get steps' });
  }
});

router.post('/', async (req, res) => {
  const {scheme_name} = req.body;
  if(!scheme_name){
    res.status(400).json({message:"Please add a name"})
  }else{

    try {
      const scheme = await Schemes.add(req.body);
      res.status(201).json(scheme);
    } catch (err) {
      res.status(500).json({ message: 'Failed to create new scheme' });
    }
  }

});

router.post('/:id/addStep', async (req, res) => {
  const stepData = req.body;
  const { id } = req.params; 

  try {
    const scheme = await Schemes.findById(id);

    if (scheme) {
      const step = await Schemes.addStep(stepData, id);
      res.status(201).json(step);
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id.' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to create new step' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const scheme = await Schemes.findById(id);

    if (scheme) {
      const updatedScheme = await Schemes.update(changes, id);
      res.json(updatedScheme);
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to update scheme' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Schemes.remove(id);

    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete scheme' });
  }
});


router.delete('/:id/steps/:step_id', async (req, res) => {
  const {step_id} = req.params;

  try {
    const deleted = await Schemes.removeStep(step_id);

    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete scheme' });
  }
});
module.exports = router;