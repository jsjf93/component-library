import { Component, type ReactNode } from 'react'
import { Alert, Button } from '@borderline/ui'

type Props = {
  children: ReactNode
  /** Called when the user clicks Retry — use it to invalidate cached promises. */
  onReset?: () => void
  /** Short context for the message, e.g. "market data". */
  label?: string
}

type State = { error: Error | null }

/**
 * Catches render/data errors (including promises rejected via `use()`) and
 * shows an accessible `<Alert role="alert">` with a working Retry button.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  handleReset = () => {
    this.props.onReset?.()
    this.setState({ error: null })
  }

  render() {
    const { error } = this.state
    if (error) {
      return (
        <div className="p-6 md:p-8">
          <Alert variant="danger" title={`Couldn't load ${this.props.label ?? 'data'}`}>
            <p>{error.message || 'Something went wrong while talking to Kraken.'}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={this.handleReset}
            >
              Retry
            </Button>
          </Alert>
        </div>
      )
    }
    return this.props.children
  }
}
