export function Layout({ children }: React.PropsWithChildren) {
  return (
    <section className="py-4">
      <div className="mx-auto max-w-300 px-4">{children}</div>
    </section>
  );
}
