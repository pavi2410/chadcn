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
 * Registry item type definition based on the shadcn registry schema
 */
export interface RegistryItem {
  $schema?: string;
  name: string;
  title?: string;
  description?: string;
  type?: string;
  author?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files?: {
    path: string;
    type: string;
    target?: string;
  }[];
  cssVars?: {
    theme?: Record<string, string>;
    light?: Record<string, string>;
    dark?: Record<string, string>;
  };
  css?: Record<string, any>;
  docs?: string;
  categories?: string[];
  meta?: Record<string, any>;
}

/**
 * Registry type definition based on the shadcn registry schema
 */
export interface Registry {
  $schema?: string;
  name: string;
  description?: string;
  homepage?: string;
  items?: RegistryItem[];
  [key: string]: any;
}

/**
 * Processes and normalizes registry data
 */
export function processRegistryData(data: any): Registry {
  // If this is a registry item (not a full registry)
  if (data.type && data.type.startsWith('registry:')) {
    return {
      name: data.name || 'Unknown',
      description: data.description || '',
      homepage: '',
      items: [data], // Treat the single item as the only item in this registry
    };
  }
  
  // Regular registry with multiple items
  return {
    name: data.name || 'Unknown',
    description: data.description || '',
    homepage: data.homepage || '',
    items: data.items || [],
    ...data, // Include all other properties
  };
}
