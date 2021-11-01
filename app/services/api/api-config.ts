// Use this import if you want to use "env.js" file
// Or just specify it directly like this:

/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: "https://opentdb.com/api.php",
  timeout: 10000,
}
