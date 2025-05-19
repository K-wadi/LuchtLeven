import { render, screen } from "@testing-library/react"
import { LoadingState } from "../loading-state"

describe("LoadingState", () => {
  it("renders with default message", () => {
    render(<LoadingState />)
    expect(screen.getByText("Laden...")).toBeInTheDocument()
  })

  it("renders with custom message", () => {
    const customMessage = "Custom loading message"
    render(<LoadingState message={customMessage} />)
    expect(screen.getByText(customMessage)).toBeInTheDocument()
  })

  it("renders loading spinner", () => {
    render(<LoadingState />)
    expect(screen.getByRole("status")).toBeInTheDocument()
  })
}) 