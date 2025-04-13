import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IconExternalLink } from '@tabler/icons-react';

interface RegistryCardProps {
  registry: {
    id: string;
    name: string;
    description: string;
    items: any[];
    homepage?: string;
    featured?: boolean;
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
          {registry.items.length} component{registry.items.length !== 1 ? 's' : ''}
        </p>
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
