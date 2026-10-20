import { useParams } from 'react-router-dom'
import { Device } from '../../components/Device'
import { Title } from '../../components/Title'
import { FLOWS } from './index'

/** Renders one flow screen by id at /explore/flow/:id, framed like every other screen. */
export function FlowRoute() {
  const { id } = useParams()
  const f = FLOWS.find((x) => x.id === id)
  if (!f) return <p className="p-6 text-white">No flow screen “{id}”.</p>
  return (
    <Title name={`Exploration: ${f.name}`}>
      <Device bg={f.dark ? 'bg-night' : undefined}>
        <f.Component />
      </Device>
    </Title>
  )
}
