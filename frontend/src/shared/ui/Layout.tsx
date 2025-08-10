function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="mx-auto w-full min-w-[375px] px-4 lg:max-w-[1024px]">
      {children}
    </div>
  );
}

export { Layout };
