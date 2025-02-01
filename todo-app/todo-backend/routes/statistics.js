const express = require("express")
const router = express.Router()
const { getAsync } = require("../redis")

router.get("/", async (req, res) => {
  const addedTodods = (await getAsync("added_todos")) || 0
  res.json({ addedTodods: Number(addedTodods) })
})

module.exports = router
