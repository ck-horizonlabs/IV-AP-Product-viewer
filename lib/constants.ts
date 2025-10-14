export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'IV API Product Viewer';
export const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV || 'development';

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

export const PRODUCT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DRAFT: 'draft',
  ARCHIVED: 'archived',
} as const;

export const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as const;
