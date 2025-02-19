const express = require("express")
const { Todo } = require("../mongo")
const router = express.Router()
const { getAsync, setAsync } = require("../redis")

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos)
})

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  })

  let currentCount = await getAsync("added_todos")
  currentCount = currentCount ? Number(currentCount) + 1 : 1
  await setAsync("added_todos", currentCount)

  res.send(todo)
})

const singleRouter = express.Router()

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200)
})

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  res.json(req.todo)
})

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  try {
    const { text, done } = req.body

    req.todo.text = text ? text : req.todo.text
    req.todo.done = done ? done : req.todo.done

    await req.todo.save()

    res.json(req.todo)
  } catch (error) {
    res.status(400).json({ error: "Invalid request" })
  }
})

router.use("/:id", findByIdMiddleware, singleRouter)

module.exports = router
