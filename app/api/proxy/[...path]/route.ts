import { NextRequest, NextResponse } from 'next/server';
import { apiConfig } from '@/config/api-config';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleRequest('GET', request, params);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleRequest('POST', request, params);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleRequest('PUT', request, params);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleRequest('DELETE', request, params);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleRequest('PATCH', request, params);
}

async function handleRequest(
  method: string,
  request: NextRequest,
  params: Promise<{ path: string[] }>
) {
  try {
    const { path } = await params;
    const targetPath = path.join('/');
    const searchParams = request.nextUrl.searchParams;

    // Build the target URL
    const url = new URL(`${apiConfig.baseUrl}/${targetPath}`);
    searchParams.forEach((value, key) => {
      url.searchParams.append(key, value);
    });

    // Prepare headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'x-api-key': apiConfig.apiKey,
    };

    // Prepare request options
    const options: RequestInit = {
      method,
      headers,
    };

    // Add body for POST, PUT, PATCH
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      const body = await request.text();
      if (body) {
        options.body = body;
      }
    }

    // Log request if enabled
    if (apiConfig.enableLogging) {
      console.log(`[API Proxy] ${method} ${url.toString()}`);
    }

    // Make the request
    const response = await fetch(url.toString(), options);

    // Get response data
    const contentType = response.headers.get('content-type');
    let data;

    if (contentType?.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    // Log response if enabled
    if (apiConfig.enableLogging) {
      console.log(`[API Proxy] Response ${response.status}`, data);
    }

    // Return response
    return NextResponse.json(data, {
      status: response.status,
      statusText: response.statusText,
    });
  } catch (error) {
    console.error('[API Proxy] Error:', error);

    return NextResponse.json(
      {
        error: 'API proxy error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
