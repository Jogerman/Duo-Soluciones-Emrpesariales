/**
 * Podcast utility functions
 */

/**
 * Format duration in seconds to human-readable format
 * @param seconds - Duration in seconds
 * @returns Formatted string like "1h 23m" or "45m"
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  return `${minutes}m`
}

/**
 * Format duration in seconds to timestamp format (MM:SS or HH:MM:SS)
 * @param seconds - Duration in seconds
 * @returns Formatted string like "45:30" or "1:23:45"
 */
export function formatDurationTimestamp(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

/**
 * Format season and episode number
 * @param season - Season number (optional)
 * @param episode - Episode number
 * @returns Formatted string like "T1 E5" or "Episodio 5"
 */
export function formatSeasonEpisode(season: number | undefined, episode: number): string {
  if (season) {
    return `T${season} E${episode}`
  }
  return `Episodio ${episode}`
}

/**
 * Convert Spotify URL to embed URL
 * @param spotifyUrl - Spotify open URL (https://open.spotify.com/episode/{id})
 * @returns Embed URL (https://open.spotify.com/embed/episode/{id})
 */
export function getSpotifyEmbedUrl(spotifyUrl: string): string {
  // If already an embed URL, return as is
  if (spotifyUrl.includes('/embed/')) {
    return spotifyUrl
  }

  // Convert open.spotify.com to embed URL
  return spotifyUrl.replace('open.spotify.com/', 'open.spotify.com/embed/')
}

/**
 * Format date to Spanish locale
 * @param date - Date string or Date object
 * @returns Formatted date like "15 de enero, 2025"
 */
export function formatPodcastDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date

  return dateObj.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Calculate reading/listening time for transcript
 * @param text - Transcript text
 * @returns Estimated reading time in minutes
 */
export function estimateReadingTime(text: string): number {
  const wordsPerMinute = 200
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}
