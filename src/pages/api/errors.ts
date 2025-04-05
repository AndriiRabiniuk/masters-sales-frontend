import { NextApiRequest, NextApiResponse } from 'next';

// Define custom error handling middleware for API routes
export default function errorHandler(
  err: any,
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Log the error for debugging
  console.error('API Error:', err);

  // Format the error for client-side display
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || 'Internal Server Error';

  // Send a formatted error response
  return res.status(statusCode).json({
    success: false,
    message: errorMessage,
    // Don't include stack traces in production
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
} 