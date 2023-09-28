import { LOG } from './logger'

const onShutdown: Array<() => void> = []

export function AtShutdown (fn: () => void): void {
  onShutdown.push(fn)
}

function shutdown (): void {
  onShutdown.forEach((fn) => { fn() })
  LOG.info('Shutdown complete')
  process.exit(0)
}

process.on('SIGINT', () => {
  LOG.info('Received SIGINT. Graceful shutdown...')
  shutdown()
})

process.on('SIGTERM', () => {
  LOG.info('Received SIGTERM. Graceful shutdown...')
  shutdown()
})

process.on('uncaughtException', (error) => {
  LOG.warn('Uncaught Exception:', error)
  shutdown()
})
