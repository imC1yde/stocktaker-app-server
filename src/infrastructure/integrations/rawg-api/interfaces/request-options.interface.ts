import { RetryConfig } from 'rxjs'

export interface IRequestOptions {
  timeout: number
  retryConfig: RetryConfig
}