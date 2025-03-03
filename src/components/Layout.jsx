export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <header className="w-full bg-blue-600 text-white py-4 text-center font-semibold text-lg">
                Job Interview Questionnaire
            </header>
            <main className="flex-grow w-full max-w-2xl p-6">{children}</main>
            <footer className="w-full py-4 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Job Prep App
            </footer>
        </div>
    );
}