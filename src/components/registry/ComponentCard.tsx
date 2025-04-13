import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IconCode } from '@tabler/icons-react';

interface ComponentCardProps {
  name: string;
  title: string;
  description: string;
}

export default function ComponentCard({ name, title, description }: ComponentCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">{name}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm line-clamp-3">{description}</p>
      </CardContent>
      <div className="p-4 pt-0 mt-auto">
        <Button variant="outline" size="sm" className="w-full">
          <IconCode className="h-4 w-4 mr-2" />
          View Component
        </Button>
      </div>
    </Card>
  );
}
