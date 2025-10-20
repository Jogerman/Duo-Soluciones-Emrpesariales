import { RenderAdmin } from '@payloadcms/next/views'
import { importConfig } from '@payloadcms/next/utilities'
import config from '@/payload.config'

const Admin = async () => {
  const resolvedConfig = await importConfig(config)

  return <RenderAdmin config={resolvedConfig} />
}

export default Admin
