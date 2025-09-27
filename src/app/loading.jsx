export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>

        {/* Texte */}
        <p className="mt-6 text-lg font-medium text-gray-300 animate-pulse">
          Chargement en cours...
        </p>
      </div>
    </div>
  );
}
