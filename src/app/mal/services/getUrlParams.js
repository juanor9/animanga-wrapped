"use client";
import { useEffect } from "react";

export default function GetUrlParams (props) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const uri = window.location.href;
      const url = new URL(uri);
      const codeFromUrl = url.searchParams.get('code');
      window.localStorage.setItem('code', codeFromUrl)
    }
  }, []);


};

export function SetVerifier ({verifier, challenge}) {
  useEffect(() => {
    window.localStorage.setItem('verifier', verifier)
    window.localStorage.setItem('challenge', challenge)
  }, [verifier]);
};
