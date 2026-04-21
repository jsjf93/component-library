function App() {
  return (
    <main className="min-h-screen bg-stone-950 text-stone-50">
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center gap-8 px-6 py-16">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-stone-400">
            Demo app
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            Workspace scaffold ready for the component library demo site.
          </h1>
        </div>
        <p className="max-w-2xl text-base leading-7 text-stone-300 sm:text-lg">
          This app is intentionally minimal for now. Tailwind, Vite, and the
          workspace dependency on @borderline/ui are already configured.
        </p>
      </section>
    </main>
  )
}

export default App
