import axios from 'axios'

export default async function findSource(name: string): Promise<string> {
  try {
    const validSource = `https://minotar.net/helm/${name}`
    await axios(validSource)
    return validSource
  } catch {
    return 'https://minotar.net/avatar/steve'
  }
}