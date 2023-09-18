"use client";

import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";

import styles from "../components/css/page";
import getCatFact from "@/actions/getCatFact";

export default function Home() {
  const dispatch = useDispatch();

  const [catData, setCatData] = useState({});

  const handleGetCatFact = () => {
    dispatch(getCatFact())
      .then((res) => setCatData(res.data))
      .catch();
  };
  return (
    <>
      <style jsx>{styles}</style>
      <main className="main">
        <div className="description">
          <p>
            Get started by editing&nbsp;
            <code className="code">app/page.js</code>
          </p>
          <button type="button" onClick={handleGetCatFact}>
            Get random cat fact
          </button>

          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{" "}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className="vercelLogo"
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div className="center">
          <h3>{catData.fact}</h3>
        </div>
      </main>
    </>
  );
}
