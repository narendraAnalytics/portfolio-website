'use client';

import { useRef, useState, useEffect, useCallback } from 'react';

const zBtnStyle: React.CSSProperties = { background:'transparent', border:'none', cursor:'pointer', display:'grid', placeItems:'center', padding:6, borderRadius:8 };

export default function ImageModal({ src, name, onClose }: { src: string; name: string; onClose: () => void }) {
  const coral = '#ED6A45';
  const cream = '#FFF7EF';

  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom,  setZoom]  = useState(1);
  const [tx,    setTx]    = useState(0);
  const [ty,    setTy]    = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragRef  = useRef({ active: false, startX: 0, startY: 0, tx: 0, ty: 0 });
  const stateRef = useRef({ zoom: 1, tx: 0, ty: 0 });
  stateRef.current = { zoom, tx, ty };

  const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

  const applyZoom = useCallback((newZoom: number, mx: number, my: number) => {
    const cz  = stateRef.current.zoom;
    const ctx = stateRef.current.tx;
    const cty = stateRef.current.ty;
    const nz  = clamp(newZoom, 1, 5);
    const scale = nz / cz;
    let ntx = mx - scale * (mx - ctx);
    let nty = my - scale * (my - cty);
    if (nz === 1) { ntx = 0; nty = 0; }
    setZoom(nz); setTx(ntx); setTy(nty);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
      applyZoom(stateRef.current.zoom * factor, e.clientX - rect.left, e.clientY - rect.top);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [applyZoom]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.key === '+' || e.key === '=') && containerRef.current) {
        const r = containerRef.current.getBoundingClientRect();
        applyZoom(stateRef.current.zoom * 1.25, r.width / 2, r.height / 2);
      }
      if (e.key === '-' && containerRef.current) {
        const r = containerRef.current.getBoundingClientRect();
        applyZoom(stateRef.current.zoom / 1.25, r.width / 2, r.height / 2);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, applyZoom]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    e.preventDefault();
    dragRef.current = { active: true, startX: e.clientX - tx, startY: e.clientY - ty, tx, ty };
    setDragging(true);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragRef.current.active) return;
    setTx(e.clientX - dragRef.current.startX);
    setTy(e.clientY - dragRef.current.startY);
  };
  const onMouseUp = () => { dragRef.current.active = false; setDragging(false); };

  const zoomToCenter = (factor: number) => {
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    applyZoom(stateRef.current.zoom * factor, r.width / 2, r.height / 2);
  };
  const reset = () => { setZoom(1); setTx(0); setTy(0); };

  const cursor = zoom > 1 ? (dragging ? 'grabbing' : 'grab') : 'default';

  return (
    <div style={{ position:'fixed', inset:0, zIndex:1001, background:'rgba(10,6,4,.92)', display:'flex', flexDirection:'column' }}>
      <div style={{ flexShrink:0, background:'rgba(15,10,7,.85)', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'11px 18px' }}>
        <span style={{ fontWeight:700, fontSize:'15px', color:cream }}>{name} Preview</span>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ fontSize:'12px', color:'rgba(255,247,239,.5)', fontVariantNumeric:'tabular-nums' }}>Scroll to zoom · Drag to pan</span>
          <button onClick={onClose} aria-label="Close" style={{ width:32, height:32, borderRadius:'50%', border:'none', background:`rgba(237,106,69,.25)`, color:coral, cursor:'pointer', fontSize:'20px', display:'grid', placeItems:'center' }}>×</button>
        </div>
      </div>
      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{ flex:1, overflow:'hidden', position:'relative', cursor, background:'#0f0a07' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`${name} preview`}
          draggable={false}
          style={{
            position:'absolute', top:0, left:0,
            width:'100%', height:'100%', objectFit:'contain',
            transformOrigin:'0 0',
            transform:`translate(${tx}px,${ty}px) scale(${zoom})`,
            userSelect:'none', pointerEvents:'none',
          }}
        />
      </div>
      <div style={{ flexShrink:0, background:'rgba(0,0,0,.75)', backdropFilter:'blur(10px)', padding:'9px 16px', display:'flex', alignItems:'center', justifyContent:'center', gap:10 }}>
        <button onClick={() => zoomToCenter(1/1.25)} aria-label="Zoom out" disabled={zoom <= 1} style={{ ...zBtnStyle, color: zoom <= 1 ? '#555' : cream }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M8 11h6"/></svg>
        </button>
        <span style={{ color:cream, fontSize:'13px', minWidth:46, textAlign:'center', fontVariantNumeric:'tabular-nums' }}>{Math.round(zoom * 100)}%</span>
        <button onClick={() => zoomToCenter(1.25)} aria-label="Zoom in" disabled={zoom >= 5} style={{ ...zBtnStyle, color: zoom >= 5 ? '#555' : cream }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg>
        </button>
        <button onClick={reset} aria-label="Reset zoom" style={{ ...zBtnStyle, color:cream, background:`rgba(237,106,69,.2)`, borderRadius:8, padding:'4px 12px', fontSize:'12px', fontWeight:600 }}>Fit</button>
      </div>
    </div>
  );
}
