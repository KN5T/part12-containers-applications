import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import Todo from "./Todo"

test("renders todo text", () => {
  const todo = { text: "Exercise 12.14" }

  render(
    <Todo todo={todo} onClickDelete={() => {}} onClickComplete={() => {}} />
  )
  expect(screen.getByText("Exercise 12.14")).toBeInTheDocument()
})
