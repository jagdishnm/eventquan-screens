import { useParams } from 'react-router-dom'
import { Device } from '../../components/Device'
import { Title } from '../../components/Title'
import { CONCEPT_STATES, CONCEPTS } from '.'
import { ConceptJourney } from './ConceptJourney'

/** One concept screen at /explore/concept/:key/:n, e.g. /explore/concept/day/4. */
export function ConceptScreenRoute() {
  const { key = 'day', n = '1' } = useParams()
  const c = CONCEPTS.find((x) => x.key === key)
  const s = c?.stages.find((x) => x.n === Number(n))
  if (!c || !s) return null
  return (
    <Title name={`${c.name}: ${s.stage}`}>
      <Device bg={s.dark ? 'bg-night' : undefined}>
        <s.Screen />
      </Device>
    </Title>
  )
}

/** One concept's assembled journey board at /explore/concept/:key. */
export function ConceptJourneyRoute() {
  const { key = 'day' } = useParams()
  const c = CONCEPTS.find((x) => x.key === key)
  return (
    <Title name={`Concept ${c?.n ?? ''}: ${c?.name ?? ''}`}>
      <ConceptJourney conceptKey={key} />
    </Title>
  )
}

/** One concept's failure state at /explore/concept/:key/state/:state, e.g. /explore/concept/live/state/offline. */
export function ConceptStateRoute() {
  const { key = 'live', state = 'offline' } = useParams()
  const s = CONCEPT_STATES[key as keyof typeof CONCEPT_STATES]?.find((x) => x.key === state)
  if (!s) return null
  return (
    <Title name={`${s.title}`}>
      <Device bg={s.dark ? 'bg-night' : undefined}>
        <s.Screen />
      </Device>
    </Title>
  )
}
