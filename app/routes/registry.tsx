// app/routes/registry.tsx
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
  // Runtime properties
  name?: string;
  description?: string;
  author?: string;
  componentCount?: number;
  error?: string;
}

export const Route = createFileRoute('/registry')({
  component: RegistryPage,
})

function RegistryPage() {
  const [registries, setRegistries] = React.useState<RegistryListing[]>(registriesData);
  const [filteredRegistries, setFilteredRegistries] = React.useState<RegistryListing[]>(registriesData);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  // Fetch registry data
  React.useEffect(() => {
    const fetchRegistries = async () => {
      try {
        // Create a copy of the registries to update with fetched data
        const updatedRegistries = [...registries];
        
        // Fetch each registry in parallel
        await Promise.all(
          updatedRegistries.map(async (registry, index) => {
            try {
              // Fetch the registry data from the URL
              const response = await fetch(registry.url);
              if (!response.ok) {
                throw new Error(`Failed to fetch registry: ${response.status} ${response.statusText}`);
              }
              
              const data: Registry = await response.json();
              
              // Update the registry with the fetched data
              updatedRegistries[index] = {
                ...registry,
                name: data.name,
                description: data.description,
                author: data.maintainers?.[0]?.name,
                componentCount: Object.keys(data.components || {}).length
              };
            } catch (error) {
              console.error(`Error fetching registry ${registry.id}:`, error);
              updatedRegistries[index] = {
                ...registry,
                error: 'Failed to load registry data'
              };
            }
          })
        );
        
        setRegistries(updatedRegistries);
        setFilteredRegistries(updatedRegistries);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching registries:', error);
        setIsLoading(false);
      }
    };
    
    fetchRegistries();
  }, []);

  // Filter registries based on search query
  React.useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredRegistries(registries);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = registries.filter(registry => {
      return (
        registry.id.toLowerCase().includes(query) ||
        (registry.name && registry.name.toLowerCase().includes(query)) ||
        (registry.description && registry.description.toLowerCase().includes(query)) ||
        (registry.author && registry.author.toLowerCase().includes(query))
      );
    });

    setFilteredRegistries(filtered);
  }, [searchQuery, registries]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header showBackButton backButtonHref="/" backButtonText="Back to Home" />
      
      {/* Main Content */}
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">shadcn Registry</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover and use component registries created by the community.
            </p>
            <div className="flex max-w-md mx-auto">
              <Input 
                placeholder="Search registries..." 
                defaultValue={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchQuery(e.currentTarget.value);
                }}
                className="flex-1"
              />
              {searchQuery && (
                <Button 
                  variant="ghost" 
                  className="ml-2" 
                  onClick={() => setSearchQuery('')}
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin size-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <>
              {/* Featured Registries */}
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6">Featured Registries</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRegistries
                    .filter(registry => registry.featured)
                    .map(registry => (
                      <Card key={registry.id} className="group overflow-hidden">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <CardTitle>{registry.name || registry.id}</CardTitle>
                            <Badge variant="outline">{registry.componentCount} components</Badge>
                          </div>
                          <CardDescription className="line-clamp-2">{registry.description || 'No description available'}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm text-muted-foreground">
                            <span className="font-medium">Author:</span> {registry.author || 'Unknown'}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <span className="font-medium">Added:</span> {new Date(registry.addedAt).toLocaleDateString()}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                            <a href={`/registry/${registry.id}`}>View Registry</a>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </div>
              
              {/* All Registries */}
              <div>
                <h2 className="text-2xl font-bold mb-6">All Registries</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRegistries
                    .filter(registry => !registry.featured)
                    .map(registry => (
                      <Card key={registry.id}>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <CardTitle>{registry.name || registry.id}</CardTitle>
                            <Badge variant="outline">{registry.componentCount} components</Badge>
                          </div>
                          <CardDescription className="line-clamp-2">{registry.description || 'No description available'}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm text-muted-foreground">
                            <span className="font-medium">Author:</span> {registry.author || 'Unknown'}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <span className="font-medium">Added:</span> {new Date(registry.addedAt).toLocaleDateString()}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full" asChild>
                            <a href={`/registry/${registry.id}`}>View Registry</a>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </div>
            </>
          )}
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
