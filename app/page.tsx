import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to IV API Product Viewer
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          A test harness for exploring and testing the IV Internal API product data.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/products"
            className="block p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition"
          >
            <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-200 mb-2">
              Browse Products
            </h3>
            <p className="text-blue-700 dark:text-blue-300">
              View and search through all available products
            </p>
          </Link>
          <div className="block p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <h3 className="text-xl font-semibold text-green-900 dark:text-green-200 mb-2">
              API Explorer
            </h3>
            <p className="text-green-700 dark:text-green-300">
              Test API endpoints interactively (Coming Soon)
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Quick Start
        </h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
          <li>Configure your API credentials in the environment variables</li>
          <li>Navigate to the Products page to browse available products</li>
          <li>Click on any product to view detailed information</li>
          <li>Use the API Explorer to test custom queries</li>
        </ol>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Features
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">✓</span>
            <span className="text-gray-600 dark:text-gray-300">Product browsing and search</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">✓</span>
            <span className="text-gray-600 dark:text-gray-300">Detailed product views</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">✓</span>
            <span className="text-gray-600 dark:text-gray-300">JSON response viewer</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">✓</span>
            <span className="text-gray-600 dark:text-gray-300">Interactive API testing</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
