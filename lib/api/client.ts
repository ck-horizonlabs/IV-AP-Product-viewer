import { apiConfig } from '@/config/api-config';
import type { ApiError, ApiResponse, RequestOptions } from '@/types/api';

class ApiClient {
  private baseUrl: string;
  private apiKey: string;
  private timeout: number;
  private enableLogging: boolean;

  constructor() {
    this.baseUrl = apiConfig.baseUrl;
    this.apiKey = apiConfig.apiKey;
    this.timeout = apiConfig.timeout;
    this.enableLogging = apiConfig.enableLogging;
  }

  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean>): string {
    const url = new URL(endpoint, this.baseUrl);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    return url.toString();
  }

  private log(message: string, data?: unknown): void {
    if (this.enableLogging) {
      console.log(`[API Client] ${message}`, data || '');
    }
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { method = 'GET', headers = {}, body, params, timeout = this.timeout } = options;

    const url = this.buildUrl(endpoint, params);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey,
      ...headers,
    };

    this.log(`${method} ${url}`);

    try {
      const response = await fetch(url, {
        method,
        headers: defaultHeaders,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      let data: T;
      const contentType = response.headers.get('content-type');

      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else {
        data = (await response.text()) as T;
      }

      this.log(`Response ${response.status}`, data);

      if (!response.ok) {
        throw {
          message: `API request failed: ${response.statusText}`,
          status: response.status,
          statusText: response.statusText,
          data,
        } as ApiError;
      }

      return {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
      };
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw {
            message: 'Request timeout',
            status: 408,
            statusText: 'Request Timeout',
          } as ApiError;
        }

        throw {
          message: error.message,
          data: error,
        } as ApiError;
      }

      throw error;
    }
  }

  async get<T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, 'method'>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...options, body, method: 'POST' });
  }

  async put<T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, 'method'>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...options, body, method: 'PUT' });
  }

  async delete<T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...options, method: 'DELETE' });
  }

  async patch<T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, 'method'>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...options, body, method: 'PATCH' });
  }
}

export const apiClient = new ApiClient();
