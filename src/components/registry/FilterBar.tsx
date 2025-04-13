import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { IconSearch, IconFilter, IconX } from '@tabler/icons-react';

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
  categories?: string[];
  authors?: string[];
}

export interface FilterState {
  search: string;
  categories: string[];
  authors: string[];
}

export default function FilterBar({ onFilterChange, categories = [], authors = [] }: FilterBarProps) {
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onFilterChange({
      search: value,
      categories: selectedCategories,
      authors: selectedAuthors
    });
  };

  const toggleCategory = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newCategories);
    onFilterChange({
      search,
      categories: newCategories,
      authors: selectedAuthors
    });
  };

  const toggleAuthor = (author: string) => {
    const newAuthors = selectedAuthors.includes(author)
      ? selectedAuthors.filter(a => a !== author)
      : [...selectedAuthors, author];
    
    setSelectedAuthors(newAuthors);
    onFilterChange({
      search,
      categories: selectedCategories,
      authors: newAuthors
    });
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedCategories([]);
    setSelectedAuthors([]);
    onFilterChange({
      search: '',
      categories: [],
      authors: []
    });
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-grow">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search registries..."
            className="pl-9"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <Button 
          variant={showFilters ? "default" : "outline"} 
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
          className="flex-shrink-0"
        >
          <IconFilter className="h-4 w-4" />
        </Button>
        {(search || selectedCategories.length > 0 || selectedAuthors.length > 0) && (
          <Button 
            variant="ghost" 
            size="icon"
            onClick={clearFilters}
            className="flex-shrink-0"
          >
            <IconX className="h-4 w-4" />
          </Button>
        )}
      </div>

      {showFilters && (
        <div className="space-y-4 p-4 border rounded-md">
          {categories.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategories.includes(category) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {authors.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2">Authors</h3>
              <div className="flex flex-wrap gap-2">
                {authors.map((author) => (
                  <Badge
                    key={author}
                    variant={selectedAuthors.includes(author) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleAuthor(author)}
                  >
                    {author}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {(selectedCategories.length > 0 || selectedAuthors.length > 0) && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {selectedCategories.map((category) => (
            <Badge key={category} variant="secondary" className="flex items-center gap-1">
              {category}
              <IconX 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => toggleCategory(category)}
              />
            </Badge>
          ))}
          {selectedAuthors.map((author) => (
            <Badge key={author} variant="secondary" className="flex items-center gap-1">
              {author}
              <IconX 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => toggleAuthor(author)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
