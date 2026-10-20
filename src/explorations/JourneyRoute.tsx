import { useParams } from 'react-router-dom'
import { Title } from '../components/Title'
import { ExplorationJourney } from './ExplorationJourneys'

/** One direction's assembled journey board at /explore/journey/:letter. */
export function JourneyRoute() {
  const { letter = 'A' } = useParams()
  return (
    <Title name={`Exploration ${letter}: assembled journey`}>
      <ExplorationJourney letter={letter.toUpperCase()} />
    </Title>
  )
}
