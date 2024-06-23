import Link from "next/link";

import { UserToolTip } from "./UserTollTip";

export function Nav() {
  return (
    <div className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-5 md:px-10 ">
      <nav className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <h1 className="font-bold text-2xl text-violet-600">Stremify</h1>
        </Link>
      </nav>

      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial"></div>
        <UserToolTip />
      </div>
    </div>
  );
}
