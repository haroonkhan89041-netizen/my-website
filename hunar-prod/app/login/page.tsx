'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';

export default function Login() {
  const router = useRouter();
  const [e, setE] = useState('');
  const [p, setP] = useState('');
  const [m, setM] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  async function go(x: React.FormEvent) {
    x.preventDefault();
    setM('');
    setLoading(true);
    const { error } = await supabase().auth.signInWithPassword({ email: e.trim(), password: p });
    if (error) {
      setM(error.message);
      setLoading(false);
      return;
    }
    router.replace('/dashboard');
    router.refresh();
  }

  return <main className="section"><div style={{maxWidth:470,margin:'auto'}}><Link className="brand" href="/"><span className="mark"/>HUNAR</Link><section className="panel" style={{marginTop:40}}><div className="eyebrow">Welcome back</div><h2>Work globally.<br/>Start here.</h2><form className="form" onSubmit={go}><label>Email<input required type="email" value={e} onChange={x=>setE(x.target.value)} placeholder="you@example.com" autoComplete="email"/></label><label>Password><div style={{display:'flex',gap:8}}><input style={{flex:1}} required type={show?'text':'password'} value={p} onChange={x=>setP(x.target.value)} placeholder="Your password" autoComplete="current-password"/><button type="button" className="btn light" onClick={()=>setShow(!show)}>{show?'Hide':'Show'}</button></div></label><button className="btn accent" disabled={loading}>{loading?'Signing in…':'Sign in'}</button>{m&&<div className="notice">{m}</div>}</form><p className="muted"><Link href="/forgot-password">Forgot password?</Link> · <Link href="/signup">Create account</Link></p></section></div></main>;
}