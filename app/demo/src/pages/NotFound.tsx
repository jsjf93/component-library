import { Alert } from '@borderline/ui'
import { PageHeading } from '../components/PageHeading'
import { ButtonLink } from '../components/ButtonLink'

export default function NotFound() {
  return (
    <div className="space-y-6 p-6 md:p-8">
      <PageHeading title="Page not found" />
      <Alert variant="info" title="There's nothing here">
        <p>The page you were looking for doesn’t exist.</p>
        <ButtonLink to="/" className="mt-3">
          Go to portfolio
        </ButtonLink>
      </Alert>
    </div>
  )
}
