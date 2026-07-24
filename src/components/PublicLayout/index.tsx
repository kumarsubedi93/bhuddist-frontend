"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Children, Fragment, ReactNode, useEffect } from "react";
import Navbar from "./Navbar";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
type Props = {
  children: ReactNode;
};

const PublicLayout = ({ children }: Props) => {
  const pathName = usePathname();
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const _push = router.push.bind(router);

    router.push = (href, options) => {
      nProgress.start();
      _push(href, options);
    };
    const _replace = router.push.bind(router);

    router.replace = (href, options) => {
      console.log(options, "optionn");
      nProgress.start();
      _replace(href, options);
    };
  }, []);

  useEffect(() => {
    nProgress.done();
  }, [pathname, params]);

  return (
    <Fragment>
      {pathName.startsWith("/admin") ? (
        children
      ) : (
        <div>
          <Navbar />
          {children}
        </div>
      )}
    </Fragment>
  );
};

export default PublicLayout;
