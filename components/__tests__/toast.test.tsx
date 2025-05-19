import { render, screen, fireEvent, act } from "@testing-library/react"
import { Toast } from "../toast"

describe("Toast", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it("renders success toast", () => {
    render(<Toast message="Success message" type="success" />)
    expect(screen.getByText("Success message")).toBeInTheDocument()
  })

  it("renders error toast", () => {
    render(<Toast message="Error message" type="error" />)
    expect(screen.getByText("Error message")).toBeInTheDocument()
  })

  it("renders info toast", () => {
    render(<Toast message="Info message" type="info" />)
    expect(screen.getByText("Info message")).toBeInTheDocument()
  })

  it("closes after duration", () => {
    const onClose = jest.fn()
    render(<Toast message="Test message" type="success" onClose={onClose} />)
    
    act(() => {
      jest.advanceTimersByTime(3000)
    })

    expect(onClose).toHaveBeenCalled()
  })

  it("closes when close button is clicked", () => {
    const onClose = jest.fn()
    render(<Toast message="Test message" type="success" onClose={onClose} />)
    
    const closeButton = screen.getByRole("button")
    fireEvent.click(closeButton)

    expect(onClose).toHaveBeenCalled()
  })
}) 