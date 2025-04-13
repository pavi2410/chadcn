// app/routes/registry.$id.tsx
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Header } from '@/components/header'
import React from 'react'
import registriesData from '@/data/registries.json'

// Define types based on the schemas
interface RegistryItem {
  name: string;
  description: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  styles?: string[];
  files?: Record<string, string>;
  type: "components" | "cli" | "ui";
  registryDependencies?: string[];
  author?: string;
}

interface Registry {
  name: string;
  description: string;
  url: string;
  maintainers: Array<{
    name: string;
    url?: string;
    github?: string;
    twitter?: string;
  }>;
  components: Record<string, RegistryItem>;
}

interface RegistryListing {
  id: string;
  url: string;
  featured: boolean;
  addedAt: string;
}

export const Route = createFileRoute('/registry/$id')({
  component: RegistryDetailPage,
})

function RegistryDetailPage() {
  const { id } = Route.useParams();
  const [registry, setRegistry] = React.useState<Registry | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  
  // Find the registry URL from the registries data
  const registryData = registriesData.find(r => r.id === id);

  // Fetch registry data
  React.useEffect(() => {
    const fetchRegistry = async () => {
      if (!registryData) {
        setError('Registry not found');
        setIsLoading(false);
        return;
      }
      
      try {
        const response = await fetch(registryData.url);
        if (!response.ok) {
          throw new Error(`Failed to fetch registry: ${response.status} ${response.statusText}`);
        }
        
        const data: Registry = await response.json();
        setRegistry(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching registry:', error);
        setError('Failed to load registry data');
        setIsLoading(false);
      }
    };
    
    fetchRegistry();
  }, [id, registryData]);

  // Filter components based on search query
  const filteredComponents = React.useMemo(() => {
    if (!registry) return [];
    
    const components = Object.entries(registry.components);
    if (!searchQuery) return components;
    
    return components.filter(([key, component]) => {
      return (
        key.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [registry, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header showBackButton backButtonHref="/registry" backButtonText="Back to Registry" />
      
      {/* Main Content */}
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin size-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-destructive mb-4">Error</h2>
              <p className="text-muted-foreground">{error}</p>
              <Button className="mt-8" asChild>
                <a href="/registry">Back to Registry</a>
              </Button>
            </div>
          ) : registry ? (
            <>
              {/* Registry Header */}
              <div className="mb-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div>
                    <h1 className="text-4xl font-bold mb-2">{registry.name}</h1>
                    <p className="text-xl text-muted-foreground">{registry.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {registry.maintainers.map((maintainer, index) => (
                      <div key={index} className="flex items-center gap-2">
                        {maintainer.github && (
                          <a 
                            href={`https://github.com/${maintainer.github}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <svg viewBox="0 0 24 24" className="size-5">
                              <path
                                fill="currentColor"
                                d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
                              />
                            </svg>
                            {maintainer.name}
                          </a>
                        )}
                        {maintainer.twitter && (
                          <a 
                            href={`https://twitter.com/${maintainer.twitter}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <svg viewBox="0 0 24 24" className="size-5">
                              <path
                                fill="currentColor"
                                d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                              />
                            </svg>
                            @{maintainer.twitter}
                          </a>
                        )}
                        {!maintainer.github && !maintainer.twitter && maintainer.name}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <Input 
                    placeholder="Search components..." 
                    defaultValue={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setSearchQuery(e.currentTarget.value);
                    }}
                    className="max-w-md"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {filteredComponents.length} {filteredComponents.length === 1 ? 'component' : 'components'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Components Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredComponents.map(([key, component]) => (
                  <Card key={key} className="group overflow-hidden">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{component.name}</CardTitle>
                        <Badge variant="outline">{component.type}</Badge>
                      </div>
                      <CardDescription className="line-clamp-2">{component.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {component.dependencies && Object.keys(component.dependencies).length > 0 && (
                        <div className="mb-2">
                          <h4 className="text-sm font-medium mb-1">Dependencies</h4>
                          <div className="flex flex-wrap gap-2">
                            {Object.keys(component.dependencies).map(dep => (
                              <Badge key={dep} variant="secondary" className="text-xs">
                                {dep}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {component.registryDependencies && component.registryDependencies.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium mb-1">Registry Dependencies</h4>
                          <div className="flex flex-wrap gap-2">
                            {component.registryDependencies.map(dep => (
                              <Badge key={dep} variant="outline" className="text-xs">
                                {dep}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        Install Component
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {filteredComponents.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No components found</h3>
                  <p className="text-muted-foreground">Try adjusting your search query</p>
                </div>
              )}
            </>
          ) : null}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-8 border-t border-border mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">© {new Date().getFullYear()} chadcn. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
