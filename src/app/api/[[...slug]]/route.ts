import { REST_API } from '@payloadcms/next/routes'
import config from '@/payload.config'

export const { DELETE, GET, PATCH, POST, PUT } = REST_API(config)
