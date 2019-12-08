export type Doc = {
  id: string
  data(): any
}

export type ConvertedDoc = {
  id: string
  [key: string]: any
}

export function convertDocs(docs: Doc[]): ConvertedDoc[] {
  return docs.map(doc => ({ id: doc.id, ...doc.data() }))
}
