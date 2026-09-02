function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#FFF5F5] text-[#4A4A4A]">
      <main className="min-h-screen">{children}</main>
    </div>
  );
}

export default DashboardLayout;