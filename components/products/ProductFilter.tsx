'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import type { ProductFilters } from '@/types/products';

interface ProductFilterProps {
  onFilterChange: (filters: ProductFilters) => void;
}

export function ProductFilter({ onFilterChange }: ProductFilterProps) {
  const [search, setSearch] = useState('');
  const [store, setStore] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({
      search: search || undefined,
      store: store || undefined,
      status: status || undefined,
    });
  };

  const handleReset = () => {
    setSearch('');
    setStore('');
    setStatus('');
    onFilterChange({});
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="Search"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          label="Store"
          value={store}
          onChange={(e) => setStore(e.target.value)}
          options={[
            { value: '', label: 'All Stores' },
            { value: 'au', label: 'Australia' },
            { value: 'nz', label: 'New Zealand' },
            { value: 'uk', label: 'United Kingdom' },
            { value: 'us', label: 'United States' },
          ]}
        />
        <Select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={[
            { value: '', label: 'All Statuses' },
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
            { value: 'draft', label: 'Draft' },
            { value: 'archived', label: 'Archived' },
          ]}
        />
      </div>
      <div className="flex gap-2">
        <Button type="submit">Apply Filters</Button>
        <Button type="button" variant="secondary" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </form>
  );
}
