interface User {
  id: number
  name: string
  email: string
  password: string
  createdAt: Date
}

interface Keyword {
  id: number
  userId: number
  keyword: string
  volume: number
  difficulty: number
  cpc: number
  competition: string
  createdAt: Date
}

interface Content {
  id: number
  userId: number
  keywordId: number
  title: string
  outline: string
  article: string
  seoOptimized: string
  internalLinks: string[]
  status: 'draft' | 'published'
  createdAt: Date
  updatedAt: Date
}

export const db = {
  users: [
    { id: 1, name: 'Hảo', email: 'test@example.com', password: 'password', createdAt: new Date() }
  ] as User[],
  keywords: [] as Keyword[],
  contents: [] as Content[]
}

export { User, Keyword, Content }