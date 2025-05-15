import style from './page-layout.module.scss';

export const PageLayout = ({
  header,
  taskBoard,
}: {
  header: React.ReactNode;
  taskBoard: React.ReactNode;
}) => {
  return (
    <div className={style.page}>
      {header}
      <main className="content">
        <h1 className="visually-hidden">TimeFlow App.</h1>
        {taskBoard}
      </main>
    </div>
  );
};
