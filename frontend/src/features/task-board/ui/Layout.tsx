export function Layout({ children }: React.PropsWithChildren) {
  return (
    <section className="py-4">
      <div className="mx-auto max-w-7xl px-4">{children}</div>
    </section>
  );
}
