'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const nav = [
  ['Overview', '/dashboard', '⌂'],
  ['Find work', '/marketplace', '⌕'],
  ['Messages', '#', '✉'],
  ['Contracts', '#', '▣'],
  ['Earnings', '#', '◈'],
  ['Settings', '#', '⚙'],
];

export default function Dashboard() {
  const [name, setName] = useState('there');
  const [email, setEmail] = useState('');

  useEffect(() => {
    supabase().auth.getUser().then(({ data }) => {
      const user = data.user;
      if (!user) return;
      const metadata = user.user_metadata || {};
      setName(metadata.full_name || metadata.name || user.email?.split('@')[0] || 'there');
      setEmail(user.email || '');
    });
  }, []);

  return (
    <main className="dashboard">
      <aside className="sidebar">
        <Link className="brand" href="/"><span className="mark" />HUNAR</Link>
        <div className="side-label">WORKSPACE</div>
        <nav className="side-nav">
          {nav.map(([label, href, icon], index) => index === 0 ? (
            <Link className="sideitem active" href={href} key={label}><span className="sideicon">{icon}</span>{label}</Link>
          ) : href === '#' ? (
            <button className="sideitem" key={label}><span className="sideicon">{icon}</span>{label}<span className="soon">Soon</span></button>
          ) : (
            <Link className="sideitem" href={href} key={label}><span className="sideicon">{icon}</span>{label}</Link>
          ))}
        </nav>
        <div className="sidebar-card">
          <span className="mini-dot" />
          <strong>Build your reputation</strong>
          <p>Complete your profile to stand out to clients worldwide.</p>
          <Link href="#" className="sidebar-link">Complete profile →</Link>
        </div>
        <div className="sidebar-user">
          <div className="avatar">{name.slice(0, 1).toUpperCase()}</div>
          <div><strong>{name}</strong><small>{email || 'Freelancer account'}</small></div>
        </div>
      </aside>

      <div className="main dashboard-main">
        <header className="topbar">
          <div><span className="top-kicker">Freelancer workspace</span><b>Overview</b></div>
          <div className="top-actions"><Link className="top-link" href="/marketplace">Browse projects</Link><Link className="btn accent" href="/marketplace">Find work <span>↗</span></Link></div>
        </header>

        <div className="content dashboard-content">
          <section className="welcome-row">
            <div><div className="eyebrow">Your workspace · Pakistan</div><h1>Good morning, {name.split(' ')[0]}.</h1><p className="muted">Keep momentum going. Here’s what needs your attention today.</p></div>
            <div className="online-pill"><span />Available for work</div>
          </section>

          <section className="stats">
            {[['Total earnings','$8,420','+12.8% this month'],['Active projects','04','2 need attention'],['Profile views','1,284','+18.4% this week'],['Response time','2.4h','Top 10% response']].map(([label, value, note]) => (
              <div className="stat" key={label}><div className="stat-head"><small>{label}</small><span>↗</span></div><strong>{value}</strong><span className="stat-note">{note}</span></div>
            ))}
          </section>

          <div className="dashboard-grid">
            <section className="panel earnings-panel"><div className="panel-head"><div><span className="panel-kicker">Performance</span><h3>Earnings rhythm</h3></div><button className="period">Last 30 days⌄</button></div><div className="chart"><div className="chart-line"/><div className="chart-labels"><span>Aug 15</span><span>Aug 22</span><span>Aug 29</span><span>Sep 05</span><span>Sep 13</span></div></div><div className="chart-total"><strong>$2,840</strong><span>+14.6% vs previous period</span></div></section>
            <section className="panel deadlines-panel"><div className="panel-head"><div><span className="panel-kicker">Your pipeline</span><h3>Upcoming deadlines</h3></div><span className="count-badge">3</span></div>{['Finch mobile banking · Sep 16','Terra Forma identity · Sep 19','Northstar AI assistant · Sep 23'].map((x, i) => <div className="listrow" key={x}><div><span className={'deadline-dot d'+i}/><span>{x.split(' · ')[0]}</span><small>{x.split(' · ')[1]}</small></div><b>Open</b></div>)}</section>
          </div>

          <section className="quick-actions"><div><span className="panel-kicker">Next move</span><h3>Ready for your next project?</h3><p className="muted">Explore fresh opportunities matched to your skills.</p></div><Link href="/marketplace" className="btn accent">Explore projects →</Link></section>
        </div>
      </div>
    </main>
  );
}
