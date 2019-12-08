import { normalize, schema } from 'normalizr';

export type TPublisher = {
  id: string
  name: string
  url: string
}

type TNormalize = {
  publishers: {
    [id: string]: TPublisher
  }
}

const publisherSchema = new schema.Entity('publishers')
const normalizer = (data: TPublisher[]) => {
  return normalize<typeof data, TNormalize, Array<TPublisher['id']>>(data, [publisherSchema])
}

export type TNormalizedPublisher = ReturnType<typeof normalizer>
export default normalizer
