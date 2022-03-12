import React from "react";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

const NavBar = () => {
  return (
    <Disclosure as="nav" className="bg-white shadow max-h-max">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-violet-light">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-shrink-0 flex items-center">
                  {/* TODO: update link with url for icc-ui page */}
                  <a href="https://develop.inclusivecareco.org">
                    <img
                      className="hidden md:block h-8 w-auto"
                      src="/color-horizontal1x.png"
                      alt="Home Icon"
                    />
                  </a>
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  {/* TODO: put navigation items here */}
                </div>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="md:hidden border-t-2">
            <div className="pt-2 pb-3 space-y-1">
              {/* TODO: put navigation items here */}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavBar;
