import { useNavigate, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError() as { status?: number; message?: string };
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate("/home");
  };

  if (error.status === 404) {
    return (
      <section className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden p-8 text-center">
          <figure className="mb-6">
            <img
              src="https://cdn.dribbble.com/users/722246/screenshots/3066818/404-page.gif"
              alt="404 error"
              className="w-full h-64 object-contain mx-auto"
            />
          </figure>

          <div className="space-y-3 mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Page Not Found</h1>
            <p className="text-gray-600">
              The page you were looking for could not be found
            </p>
            <p className="text-gray-500 text-sm">
              It might have been moved or deleted
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGoBack}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
            >
              Go Back
            </button>
            <button
              onClick={handleGoHome}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Go Home
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Something Went Wrong
        </h1>
        <p className="text-gray-600 mb-6">
          {error.message || "An unexpected error occurred"}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoBack}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
          >
            Go Back
          </button>
          <button
            onClick={handleGoHome}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Go Home
          </button>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
