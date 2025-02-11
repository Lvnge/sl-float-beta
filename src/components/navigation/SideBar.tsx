import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import LogoutModal from "../logout/LogoutModal";

interface NavLink {
  label: string;
  to: string;
  icon: React.ReactElement;
}

const navLinks: NavLink[] = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M5.616 20q-.691 0-1.153-.462T4 18.384V5.616q0-.691.463-1.153T5.616 4h12.769q.69 0 1.153.463T20 5.616v12.769q0 .69-.462 1.153T18.384 20zm0-1H11.5V5H5.616q-.231 0-.424.192T5 5.616v12.769q0 .23.192.423t.423.192m6.885 0h5.885q.23 0 .423-.192t.192-.424V12h-6.5zm0-8H19V5.616q0-.231-.192-.424T18.384 5H12.5z"
        />
      </svg>
    ),
  },
  {
    label: "Charts",
    to: "/charts",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12.5 11.5h7.489q-.202-3.039-2.326-5.172q-2.124-2.134-5.163-2.317zm-1 8.489V4.012q-3.16.182-5.33 2.483T4 12t2.17 5.505t5.33 2.484m1 0q3.039-.177 5.166-2.314q2.126-2.136 2.323-5.175H12.5zM12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.506.71t2.858 1.93t1.929 2.855q.71 1.637.71 3.511q0 1.852-.708 3.491t-1.924 2.864t-2.856 1.932t-3.509.707"
        />
      </svg>
    ),
  },
];

const accountLinks: NavLink[] = [
  {
    label: "Account",
    to: "/account",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12 12a4 4 0 1 1 0-8a4 4 0 0 1 0 8m0 3c3.186 0 6.045.571 8 3.063V20H4v-1.937C5.955 15.57 8.814 15 12 15"
        />
      </svg>
    ),
  },
  {
    label: "Log out",
    to: "/logout",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M5.616 20q-.691 0-1.153-.462T4 18.384V5.616q0-.691.463-1.153T5.616 4h5.903q.214 0 .357.143t.143.357t-.143.357t-.357.143H5.616q-.231 0-.424.192T5 5.616v12.769q0 .23.192.423t.423.192h5.904q.214 0 .357.143t.143.357t-.143.357t-.357.143zm12.444-7.5H9.692q-.213 0-.356-.143T9.192 12t.143-.357t.357-.143h8.368l-1.971-1.971q-.141-.14-.15-.338q-.01-.199.15-.364q.159-.165.353-.168q.195-.003.36.162l2.614 2.613q.242.243.242.566t-.243.566l-2.613 2.613q-.146.146-.347.153t-.366-.159q-.16-.165-.157-.357t.162-.35z"
        />
      </svg>
    ),
  },
];

const SideBar: React.FC = () => {
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  return (
    <div className="flex flex-col w-16 sm:min-w-72 bg-zinc-800 min-h-screen ">
      <div className="flex flex-col grow-1 overflow-y-auto gap-y-5 sm:px-6 ">
        {/* Logo/Title */}
        <div className="flex justify-center items-center sm:items-center sm:justify-normal shrink-0 h-16 text-zinc-200 ">
          {/* Logo/Title */}
          <svg
            className="h-8 w-8 sm:h-10 sm:w-10"
            width="67"
            height="41"
            viewBox="0 0 67 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M45.0353 4.66312C45.8331 3.77669 46.7195 3.04539 47.6281 2.46921C49.2236 1.47198 50.9079 0.940125 52.6364 0.940125V15.411C51.3732 11.0232 48.6475 7.25591 45.0353 4.66312ZM66.5533 40.9401H15.2957C6.87461 40.9401 0.0712891 34.1146 0.0712891 25.7157C0.0712891 17.6714 6.3206 11.0675 14.232 10.5135V0.940125C16.0048 0.940125 17.7555 1.44982 19.3954 2.46921C20.304 3.02323 21.1904 3.75453 21.9882 4.59663C25.2458 2.31409 29.1904 0.984446 33.4674 0.984446C33.4674 10.2254 30.1433 20.9734 19.3289 20.9955H33.3566C32.9577 19.2005 31.3178 17.8709 29.3677 17.8487H37.5228C35.5727 17.8487 33.9328 19.2005 33.5339 21.0177H46.6087C49.2236 21.0177 51.8164 21.5274 54.2541 22.5468C56.6696 23.544 58.8857 25.0288 60.725 26.8681C62.5865 28.7296 64.0491 30.9235 65.0464 33.339C66.0436 35.7324 66.5533 38.3252 66.5533 40.9401ZM22.8525 10.7795C23.1849 11.6437 24.0713 12.6188 25.3123 13.3279C26.5533 14.0371 27.8386 14.3252 28.7472 14.1922C28.4148 13.3279 27.5284 12.3529 26.2874 11.6437C25.0464 10.9346 23.761 10.6465 22.8525 10.7795ZM41.5117 13.3279C40.2707 14.0371 38.9854 14.3252 38.0768 14.1922C38.4092 13.3279 39.2957 12.3529 40.5367 11.6437C41.7777 10.9346 43.063 10.6465 43.9716 10.7795C43.6613 11.6437 42.7527 12.6188 41.5117 13.3279Z"
              fill="currentColor"
            ></path>
          </svg>
          <h1 className="font-medium ml-2 hidden sm:block">sl-float</h1>
        </div>
        {/* Navigation and account links */}
        <nav className="flex flex-col flex-1 text-zinc-400 gap-y-7">
          <ul role="list" className="flex flex-col gap-y-7 flex-1">
            {/* Navigation links */}
            <li>
              <ul
                role="list"
                className="flex-1 flex flex-col sm:-mx-2 space-y-1 items-center sm:items-stretch"
              >
                {navLinks.map(({ label, to, icon }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      end
                      className={({ isActive }) =>
                        `${
                          isActive ? "bg-zinc-900 text-zinc-200" : "bg-zinc-800"
                        } hover:bg-zinc-900 hover:text-zinc-200 p-2 rounded-md flex items-center gap-x-3 text-sm font-semibold leading-6 justify-center sm:justify-normal w-fit sm:w-full`
                      }
                    >
                      {icon}
                      <span className="hidden sm:block">{label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
            {/* Account links */}
            <li className="mt-auto mb-2 ">
              <ul
                role="list"
                className="flex-1 flex flex-col sm:-mx-2 space-y-1 items-center sm:items-stretch"
              >
                {accountLinks.map(({ label, to, icon }) =>
                  label === "Log out" ? (
                    <li key={to}>
                      <button
                        onClick={() => setLogoutModalOpen(true)}
                        className="bg-zinc-800 hover:bg-red-900 hover:text-zinc-200
                        hover:cursor-pointer
                        p-2 rounded-md flex items-center gap-x-3 text-sm font-semibold leading-6 text-left justify-center sm:justify-normal w-fit sm:w-full"
                      >
                        {icon}
                        <span className="hidden sm:block">{label}</span>
                      </button>
                    </li>
                  ) : (
                    <li key={to}>
                      <NavLink
                        to={to}
                        end
                        className={({ isActive }) =>
                          `${
                            isActive
                              ? "bg-zinc-900 text-zinc-200"
                              : "bg-zinc-800"
                          } hover:bg-zinc-900 hover:text-zinc-200 p-2 rounded-md flex items-center gap-x-3 text-sm font-semibold leading-6 justify-center sm:justify-normal w-fit sm:w-full `
                        }
                      >
                        {icon}
                        <span className="hidden sm:block">{label}</span>
                      </NavLink>
                    </li>
                  )
                )}
              </ul>
            </li>
          </ul>
        </nav>
      </div>

      {/* Logout Modal */}
      {isLogoutModalOpen && (
        <LogoutModal onClose={() => setLogoutModalOpen(false)} />
      )}
    </div>
  );
};

export default SideBar;
