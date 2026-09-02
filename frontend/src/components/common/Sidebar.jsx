import { NavLink } from "react-router-dom";

function Sidebar({ items = [], title = "Samanvay" }) {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-[#E2B4BD]/40 bg-white lg:block">
      <div className="sticky top-0 min-h-screen p-5">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#4A4A4A]">
            {title}
          </h2>

          <p className="mt-1 text-xs text-[#4A4A4A]/55">
            Samanvay Portal
          </p>
        </div>

        <nav className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-[#E2B4BD] text-[#4A4A4A]"
                      : "text-[#4A4A4A]/65 hover:bg-[#FFF5F5] hover:text-[#4A4A4A]"
                  }`
                }
              >
                {Icon && <Icon size={18} />}
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;