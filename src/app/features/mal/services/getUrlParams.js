'use client';

import { useEffect } from 'react';

export default function GetUrlParams() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const uri = window.location.href;
      const url = new URL(uri);
      const codeFromUrl = url.searchParams.get('code');
      window.localStorage.setItem('code', codeFromUrl);
    }
  }, []);
}

export function SetVerifier({ challenge, verifier }) {
  useEffect(() => {
    window.localStorage.setItem('challenge', challenge);
    window.localStorage.setItem('code_verifier', verifier);
  }, [challenge, verifier]);
}
