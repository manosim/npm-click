import * as React from 'react';

export const Navbar = () => {
  return (
    <nav className="bg-blue-900 py-3">
      <div className="container flex flex-row items-center justify-between flex-wrap">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <a href="/">
            <img
              style={{ maxWidth: '8rem' }}
              src="/logo.svg"
              alt="NPM.click logo"
            />
          </a>
        </div>

        <div className="w-full block flex flex-1 items-center justify-end lg:w-auto">
          <ul className="flex flex-row list-none">
            <li>
              <a
                className={`px-2 py-3 lg:inline-block lg:mt-0 lowercase hover:text-blue-400`}
                href="https://github.com/manosim/npm-click"
                rel="noopener noreferrer"
              >
                <img
                  style={{ width: '1.25rem' }}
                  src="/icons/github.svg"
                  alt="GitHub Logo"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
