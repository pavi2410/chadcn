import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { IconCode, IconExternalLink, IconPackage } from '@tabler/icons-react';

interface ComponentCardProps {
  name: string;
  title: string;
  description: string;
  type?: string;
  author?: string;
  dependencies?: string[];
  categories?: string[];
  onClick?: () => void;
}

export default function ComponentCard({ 
  name, 
  title, 
  description, 
  type, 
  author, 
  dependencies = [], 
  categories = [],
  onClick 
}: ComponentCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          {type && (
            <Badge variant="outline" className="text-xs">
              {type.replace('registry:', '')}
            </Badge>
          )}
        </div>
        <CardDescription className="text-sm text-muted-foreground">{name}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-sm line-clamp-3 mb-4">{description}</p>
        
        {author && (
          <div className="text-xs text-muted-foreground mb-2">
            <span className="font-medium">Author:</span> {author}
          </div>
        )}
        
        {dependencies.length > 0 && (
          <div className="mt-3">
            <div className="text-xs font-medium mb-1">Dependencies:</div>
            <div className="flex flex-wrap gap-1">
              {dependencies.slice(0, 3).map((dep, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  <IconPackage className="h-3 w-3 mr-1" />
                  {dep}
                </Badge>
              ))}
              {dependencies.length > 3 && (
                <Badge variant="secondary" className="text-xs">+{dependencies.length - 3} more</Badge>
              )}
            </div>
          </div>
        )}
        
        {categories.length > 0 && (
          <div className="mt-3">
            <div className="flex flex-wrap gap-1">
              {categories.map((category, i) => (
                <Badge key={i} variant="outline" className="text-xs">{category}</Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={onClick}
        >
          <IconCode className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
