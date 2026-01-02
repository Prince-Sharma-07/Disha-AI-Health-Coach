import ChatContainer from "@/components/ChatContainer";

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-100 flex justify-center py-3">
      <div className="w-full max-w-3xl h-[90vh] bg-white rounded-2xl shadow-lg flex flex-col">
        <header className="px-6 py-4 border-b flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-slate-800">
              Disha
            </h1>
            <p className="text-sm text-slate-500">
              AI Health Coach • Curelink
            </p>
          </div>
        </header>

        <ChatContainer />
      </div>
    </main>
  );
}
