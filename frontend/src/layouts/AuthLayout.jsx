function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#FFF5F5] text-[#4A4A4A] flex items-center justify-center px-4 py-8">
      <main className="w-full max-w-md">{children}</main>
    </div>
  );
}

export default AuthLayout;