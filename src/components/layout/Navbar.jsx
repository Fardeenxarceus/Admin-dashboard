import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../store/features/theme/themeSlice";
import { PiMoon, PiSun } from "react-icons/pi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router-dom";

function Navbar() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);

  return (
    <div className="navbar bg-base-100 shadow-md py-0 px-6 sticky top-0 right-0 z-10">
      <div className="flex-none lg:hidden">
        <label htmlFor="main-drawer" className="btn btn-square btn-ghost">
          <HiOutlineMenuAlt3 size={30} className="text-primary" />
        </label>
      </div>

      <Link to={"/"} className="flex-1 -my-10 -mt-8">
        <img src="./image.png" alt="logo" className="w-45" />
      </Link>

      <div className="flex-none">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="btn btn-ghost btn-circle"
        >
          {theme === "light" ? (
            <PiMoon size={25} className="text-primary" />
          ) : (
            <PiSun size={25} className="text-primary-content" />
          )}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
