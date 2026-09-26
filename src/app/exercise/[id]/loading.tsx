const Loading = () => {
  return (
    <article className="grid gap-10 lg:grid-cols-2">
      <div className="skeleton min-h-72 rounded-2xl"></div>
      <div className="space-y-4">
        <div className="skeleton h-10 w-2/3"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-3/4"></div>
        <div className="flex gap-2">
          <div className="skeleton h-6 w-20 rounded-full"></div>
          <div className="skeleton h-6 w-20 rounded-full"></div>
        </div>
        <div className="space-y-2 rounded-2xl border border-base-300 p-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="skeleton h-8 w-full"></div>
          ))}
        </div>
        <div className="skeleton h-8 w-1/3"></div>
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton h-4 w-full"></div>
          ))}
        </div>
      </div>
    </article>
  );
};

export default Loading;
