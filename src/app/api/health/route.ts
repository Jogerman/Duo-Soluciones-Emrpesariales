import { NextResponse } from 'next/server'

/**
 * Health Check API Endpoint
 *
 * This endpoint is used by Railway and monitoring services to verify
 * the application is running correctly.
 *
 * Usage:
 * - Railway healthcheck: Configured in railway.toml
 * - Uptime monitoring: Configure with this endpoint
 * - Manual check: GET https://your-domain/api/health
 */
export async function GET() {
  try {
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        unit: 'MB',
      },
      version: process.env.npm_package_version || '1.0.0',
    }

    // Optional: Add database health check when DB is connected
    // Uncomment when database is configured:
    /*
    try {
      const { db } = await import('@/lib/db');
      await db.execute('SELECT 1');
      healthData.database = 'connected';
    } catch (dbError) {
      healthData.database = 'disconnected';
      healthData.status = 'degraded';
    }
    */

    return NextResponse.json(healthData, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      {
        status: 503,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      }
    )
  }
}
