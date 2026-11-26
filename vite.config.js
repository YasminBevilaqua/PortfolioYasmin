import process from 'node:process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const [owner, repository] = (process.env.GITHUB_REPOSITORY || '').split('/')
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === 'true'
const isUserSite = repository?.toLowerCase() === `${owner}.github.io`.toLowerCase()
const base = isGitHubPagesBuild && repository && !isUserSite ? `/${repository}/` : '/'

export default defineConfig({
  base,
  plugins: [react()],
})
