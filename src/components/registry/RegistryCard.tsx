import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IconExternalLink } from '@tabler/icons-react';

interface RegistryCardProps {
  registry: {
    id: number;
    name: string;
    description?: string;
    items?: any[];
    homepage?: string;
    featured?: boolean;
    type?: string;
    author?: string;
    dependencies?: string[];
    categories?: string[];
  };
  href: string;
}

export default function RegistryCard({ registry, href }: RegistryCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{registry.name}</CardTitle>
          {registry.featured && (
            <Badge variant="secondary">Featured</Badge>
          )}
        </div>
        <CardDescription className="line-clamp-2">{registry.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">
          {registry.items?.length || 0} component{(registry.items?.length || 0) !== 1 ? 's' : ''}
        </p>
        {registry.author && (
          <p className="text-xs text-muted-foreground mt-2">
            By: {registry.author}
          </p>
        )}
        {registry.type && (
          <p className="text-xs text-muted-foreground mt-1">
            Type: {registry.type.replace('registry:', '')}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button asChild variant="default">
          <a href={href}>View Details</a>
        </Button>
        {registry.homepage && (
          <Button asChild variant="ghost" size="icon">
            <a href={registry.homepage} target="_blank" rel="noopener noreferrer" aria-label="Visit homepage">
              <IconExternalLink className="h-4 w-4" />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
