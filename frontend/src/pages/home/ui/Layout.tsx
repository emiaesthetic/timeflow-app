export function Layout({
  header,
  children,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr]">
      {header}
      <main className="h-full">
        <h1 className="sr-only">TimeFlow App.</h1>
        {children}
      </main>
    </div>
  );
}
