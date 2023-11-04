import { PrismaClient } from "@prisma/client";
import express from 'express'

const prisma = new PrismaClient()
const router = express.Router()

router.get('/bugs-home', async (req, res) => {
  try {
    const data = await prisma.bugs.findMany({});
    res.json({
      bugs: data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.post('/createBugs', async (req, res) => {
  try {
    const { bugName, bugStatus, priority, assignee } = req.body;
    const result = await prisma.bugs.create({
      data: {
        bugName,
        bugStatus,
        priority,
        assignee
      }
    });
    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.post('/findBugs', async (req, res) => {
  try {
    const { id } = req.body;
    const bugId = parseInt(id, 10); // Parse the id as an integer
    
    if(!bugId){
      return res.status(400).send("Bug Id is Empty Value!")
    }

    const data = await prisma.bugs.findUnique({
      where: {
        id: bugId,
      },
    });

    if (!data) {
      // Bug with the specified ID was not found
      res.status(404).json({ message: 'Bug not found' });
    } else {
      // Bug found, return the details
      res.json({ bugs: data });
    }
  } catch (error) {
    console.error('Error finding bug:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



router.put('/updateBug', async (req, res) => {
  try {
    const { id, bugName, bugStatus, priority, assignee } = req.body;
    const bugId = parseInt(id, 10);
    
    if(!bugId){
      return res.status(400).send("Bug Id is Empty Value!")
    }

    const existingBugs = await prisma.bugs.findUnique({
      where: {
        id: bugId
      }
    })


    if (!existingBugs) {
      return res.status(400).send("Bugs not Exist")
    }
    const result = await prisma.bugs.update({
      where: {
        id: existingBugs.id
      },
      data: {
        bugName: bugName,
        bugStatus: bugStatus,
        priority: priority,
        assignee: assignee
      }
    })

    res.send(result)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.delete('/deleteBugs', async (req, res) => {

  try {
    const { id } = req.body;
    const bugId = parseInt(id, 10);

    if(!bugId){
      return res.status(400).send("Bug Id is Empty Values!")
    }

    const existingBugs = await prisma.bugs.findUnique({
      where: {
        id: bugId
      }
    })

    if (!existingBugs) {
      return res.status(400).send("Bug not Exist")
    }
    const result = await prisma.bugs.delete({
      where: {
        id: existingBugs.id
      }
    })
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }

});

export default router;
