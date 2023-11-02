import "./style.css";

import React from "react";
import logoUrl from "../assets/logo.svg";
import { Link } from "../components/Link";
import RQProvider from "../providers/RQProvider";
import { usePageContext } from "vike-react/usePageContext";
import { HydrationBoundary } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function LayoutDefault({
  children,
}: {
  children: React.ReactNode;
}) {
  const pageContext = usePageContext();
  const { dehydratedState } = pageContext
  return (
    <div
      style={{
        display: "flex",
        maxWidth: 900,
        margin: "auto",
      }}
    >
      <Sidebar>
        <Logo />
        <Link href="/">Welcome</Link>

        <Link href="/star-wars">Star Wars Movies</Link>
        <Link href="/posts">Posts</Link>
      </Sidebar>
      <Content>
        <RQProvider>
          <HydrationBoundary state={dehydratedState}>
            {children}
          </HydrationBoundary>
          <ReactQueryDevtools initialIsOpen={false} />
        </RQProvider>
      </Content>
    </div>
  );
}

function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="sidebar"
      style={{
        padding: 20,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        lineHeight: "1.8em",
        borderRight: "2px solid #eee",
      }}
    >
      {children}
    </div>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div id="page-container">
      <div
        id="page-content"
        style={{
          padding: 20,
          paddingBottom: 50,
          minHeight: "100vh",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div
      style={{
        marginTop: 20,
        marginBottom: 10,
      }}
    >
      <a href="/">
        <img src={logoUrl} height={64} width={64} alt="logo" />
      </a>
    </div>
  );
}
