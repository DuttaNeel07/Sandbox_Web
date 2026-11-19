import React, { useState } from 'react';
import { playBitSound } from '../utils/sound';

export const PacketInspector: React.FC = () => {
  const [selectedField, setSelectedField] = useState<string | null>('flags');

  const fields = [
    { id: 'ver', name: 'VERSION', hex: '45', binary: '0100 0101', desc: 'IPv4 Header (Length: 20 bytes)' },
    { id: 'tos', name: 'DSCP/ECN', hex: '00', binary: '0000 0000', desc: 'Standard Best-Effort Routine' },
    { id: 'len', name: 'LENGTH', hex: '00 3C', binary: '00000000 00111100', desc: 'Total Packet Length (60 bytes)' },
    { id: 'id', name: 'IDENT', hex: '5B A2', binary: '01011011 10100010', desc: 'Fragment Identifier' },
    { id: 'flags', name: 'FLAGS/FRAG', hex: '40 00', binary: '01000000 00000000', desc: 'DF (Don’t Fragment) Bit Set' },
    { id: 'ttl', name: 'TTL', hex: '40', binary: '0100 0000', desc: 'Time To Live (64 Hops)' },
    { id: 'proto', name: 'PROTO', hex: '06', binary: '0000 0110', desc: 'IP Protocol 6 (TCP)' },
    { id: 'chk', name: 'CHECKSUM', hex: 'A7 2F', binary: '10100111 00101111', desc: 'Valid Header Checksum' },
    { id: 'src', name: 'SRC_IP', hex: 'C0 A8 01 25', binary: '11000000 10101000 00000001 00100101', desc: '192.168.1.37 (Hacker Workstation)' },
    { id: 'dst', name: 'DST_IP', hex: '0C 5A 4D 0E', binary: '00001100 01011010 01001101 00001110', desc: '12.90.77.14 (DSCE Sandbox Arena)' },
    { id: 'port', name: 'DST_PORT', hex: '07 EB', binary: '00000111 11101011', desc: 'Port 2027 (Sandbox Daemon)' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto my-12 p-6 sm:p-8 bg-void-950/80 border border-bit-border/80 rounded-2xl shadow-xl backdrop-blur-md font-mono">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-bit-border/60">
        <div className="flex items-center gap-2 text-xs text-bit-cyan">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>WIRESHARK-STYLE PACKET DISSECTOR // LIVE TCP SYN</span>
        </div>
        <span className="text-[11px] text-bit-dim">CLICK ANY BYTE TO INSPECT RAW BITS</span>
      </div>

      {/* Byte Stream */}
      <div className="flex flex-wrap gap-2 mb-6 p-4 bg-void-900 border border-bit-border rounded-xl">
        {fields.map((f) => {
          const isSelected = selectedField === f.id;
          return (
            <button
              key={f.id}
              onClick={() => {
                setSelectedField(f.id);
                playBitSound('toggle');
              }}
              className={`
                px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-0.5
                ${
                  isSelected
                    ? 'bg-bit-cyan text-void-950 border-bit-cyan shadow-[0_0_12px_rgba(56,189,248,0.5)] scale-105'
                    : 'bg-void-950 hover:bg-bit-panel text-bit-bright border-bit-border/70 hover:border-bit-cyan/50'
                }
              `}
            >
              <span className="text-[9px] opacity-75">{f.name}</span>
              <span>{f.hex}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Field Deep Dive */}
      {selectedField && (
        <div className="p-4 bg-void-900/90 border border-bit-cyan/40 rounded-xl space-y-2">
          {(() => {
            const field = fields.find((f) => f.id === selectedField);
            if (!field) return null;
            return (
              <>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-bit-cyan font-bold">FIELD: {field.name}</span>
                  <span className="text-bit-bright font-bold">HEX: 0x{field.hex}</span>
                </div>
                <div className="text-xs text-bit-dim">
                  <span>RAW BITS: </span>
                  <span className="text-emerald-400 font-bold tracking-wider">{field.binary}</span>
                </div>
                <p className="text-sm font-sans text-bit-muted pt-1 border-t border-bit-border/40">
                  {field.desc}
                </p>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
};
