 export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row overflow-hidden">
      <div className="flex-grow h-screen overflow-hidden">{children}</div>
    </div>
  );
}