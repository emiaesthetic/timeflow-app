import { Background } from '@/shared/ui/Background';

function HomeLayout({
  header,
  taskBoard,
}: {
  header: React.ReactNode;
  taskBoard: React.ReactNode;
}) {
  return (
    <main className="grid min-h-screen grid-rows-[auto_1fr]">
      <Background />
      {header}
      {taskBoard}
    </main>
  );
}

export { HomeLayout };
