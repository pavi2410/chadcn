/**
 * Fetches registry data from a URL
 */
export async function fetchRegistryData(url: string) {
  try {
    // Use AbortSignal.timeout() for a cleaner timeout implementation
    const signal = AbortSignal.timeout(5000); // 5 second timeout
    
    const response = await fetch(url, {
      signal,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      console.warn(`Registry at ${url} returned status ${response.status}: ${response.statusText}`);
      return null;
    }
    
    const data = await response.json();
    console.log(`Successfully fetched registry from ${url}`);
    return data;
  } catch (error) {
    // Just log the error and return null to skip this registry
    console.warn(`Skipping registry at ${url}: ${error instanceof Error ? error.message : String(error)}`);
    return null;
  }
}

/**
 * Processes and normalizes registry data
 */
export function processRegistryData(data: any) {
  return {
    name: data.name || 'Unknown',
    description: data.description || '',
    homepage: data.homepage || '',
    items: data.items || [],
    // Add more properties as needed
  };
}
