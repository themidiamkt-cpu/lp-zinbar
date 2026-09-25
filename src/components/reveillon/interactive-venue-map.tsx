"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import {
  sectorConfig,
  sectorCapacity,
  type SectorId,
  type VenueSector,
} from "@/data/reveillon-config";
import { useReveillon } from "./reveillon-provider";

type Camera = { x: number; y: number; width: number };
type Point = { x: number; y: number };
const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

function VenueSectorShape({
  sector,
  dimmed,
  inCart,
  scale,
  onSelect,
}: {
  sector: VenueSector;
  dimmed: boolean;
  inCart: boolean;
  scale: number;
  onSelect: (id: SectorId) => void;
}) {
  const capacity = sectorCapacity(sector.id);
  const soldOut = capacity <= 0;
  const disabled = soldOut || dimmed;
  const cx = sector.x + sector.width / 2;
  const cy = sector.y + sector.height / 2;
  return (
    <g
      className={[
        "rv-sector",
        dimmed ? "rv-dimmed" : "",
        soldOut ? "rv-sector-soldout" : "",
        inCart ? "rv-sector-in-cart" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ "--sector-color": sector.color } as CSSProperties}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-label={`Setor ${sector.id}, ${sector.name}, ${soldOut ? "esgotado nesta prévia" : `${capacity} lugares disponíveis`}`}
      onClick={() => {
        if (!disabled) onSelect(sector.id);
      }}
      onKeyDown={(event) => {
        if ((event.key === "Enter" || event.key === " ") && !disabled) {
          event.preventDefault();
          onSelect(sector.id);
        }
      }}
    >
      <rect
        x={sector.x}
        y={sector.y}
        width={sector.width}
        height={sector.height}
        rx="8"
        className="rv-sector-outline"
        vectorEffect="non-scaling-stroke"
      />
      {/* Rótulo em tamanho de tela constante: continua nítido em qualquer zoom. */}
      <g transform={`translate(${cx} ${cy}) scale(${scale})`}>
        <rect
          x="-42"
          y="-19"
          width="84"
          height="38"
          rx="7"
          className="rv-sector-label-bg"
          vectorEffect="non-scaling-stroke"
        />
        <text x="0" y="-2" textAnchor="middle" className="rv-sector-label">
          SETOR {sector.id}
        </text>
        <text x="0" y="13" textAnchor="middle" className="rv-sector-sub">
          {soldOut ? "ESGOTADO" : `${capacity} LUGARES`}
        </text>
      </g>
    </g>
  );
}

function Landmark({
  x,
  y,
  width,
  height,
  label,
  vertical = false,
  scale,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  vertical?: boolean;
  scale: number;
}) {
  const cx = x + width / 2;
  const cy = y + height / 2;
  return (
    <g className="rv-landmark">
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="4"
        vectorEffect="non-scaling-stroke"
      />
      <g
        transform={`translate(${cx} ${cy}) rotate(${vertical ? 90 : 0}) scale(${scale})`}
      >
        <text x="0" y="0" textAnchor="middle" dominantBaseline="middle">
          {label}
        </text>
      </g>
    </g>
  );
}

function ZoneLabel({
  x,
  y,
  scale,
  children,
}: {
  x: number;
  y: number;
  scale: number;
  children: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <text x="0" y="0" textAnchor="middle" className="rv-zone-label">
        {children}
      </text>
    </g>
  );
}

function VenueLandmarks({ scale }: { scale: number }) {
  return (
    <g aria-hidden="true">
      <rect
        className="rv-floor-border"
        x="5"
        y="12"
        width="1055"
        height="760"
        rx="10"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        className="rv-floor-border"
        x="5"
        y="789"
        width="1055"
        height="650"
        rx="10"
        vectorEffect="non-scaling-stroke"
      />
      <Landmark
        x={965}
        y={35}
        width={80}
        height={305}
        label="ÁREA KIDS"
        vertical
        scale={scale}
      />
      <Landmark
        x={965}
        y={385}
        width={80}
        height={335}
        label="BANHEIROS"
        vertical
        scale={scale}
      />
      <Landmark
        x={18}
        y={390}
        width={63}
        height={167}
        label="ENTRADA →"
        vertical
        scale={scale}
      />
      <Landmark x={125} y={702} width={235} height={48} label="BAR" scale={scale} />
      <Landmark
        x={390}
        y={665}
        width={230}
        height={80}
        label="BUFFET FRIO"
        scale={scale}
      />
      <Landmark
        x={690}
        y={640}
        width={260}
        height={56}
        label="BUFFET QUENTE"
        scale={scale}
      />
      <Landmark x={690} y={715} width={260} height={45} label="CAIXA" scale={scale} />
      <ZoneLabel x={530} y={605} scale={scale}>
        SALÃO · ENTRADA
      </ZoneLabel>
      <path
        d="M305 630H630M140 350v14m15-14h65m190 0h65m195 0h125"
        className="rv-walkway"
        vectorEffect="non-scaling-stroke"
      />
      <Landmark
        x={333}
        y={874}
        width={276}
        height={78}
        label="ÁREA BILHAR"
        scale={scale}
      />
      <Landmark
        x={956}
        y={1030}
        width={90}
        height={354}
        label="BAR MEZANINO"
        vertical
        scale={scale}
      />
      <Landmark x={70} y={1331} width={292} height={42} label="ESCADA ↑" scale={scale} />
      <Landmark x={443} y={1360} width={202} height={60} label="MÚSICO" scale={scale} />
      <ZoneLabel x={479} y={1156} scale={scale}>
        MEZANINO
      </ZoneLabel>
      <rect
        x="428"
        y="1185"
        width="202"
        height="140"
        rx="3"
        fill="url(#rv-dance-grid)"
        stroke="#776b58"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <rect x="475" y="1232" width="110" height="40" rx="4" fill="#171314" />
      <ZoneLabel x={530} y={1257} scale={scale}>
        PISTA
      </ZoneLabel>
    </g>
  );
}

export function SectorFilter({
  selected,
  onChange,
}: {
  selected: SectorId | null;
  onChange: (id: SectorId | null) => void;
}) {
  return (
    <div
      className="rv-sector-filters"
      role="group"
      aria-label="Filtrar por setor"
    >
      <button
        type="button"
        aria-pressed={selected === null}
        onClick={() => onChange(null)}
      >
        Todos
      </button>
      {sectorConfig.map((sector) => (
        <button
          type="button"
          key={sector.id}
          aria-label={`Setor ${sector.id}`}
          aria-pressed={selected === sector.id}
          onClick={() => onChange(sector.id)}
        >
          {sector.id}
        </button>
      ))}
    </div>
  );
}

export function InteractiveVenueMap({
  sector,
  onSectorChange,
  onSelectSector,
}: {
  sector: SectorId | null;
  onSectorChange: (id: SectorId | null) => void;
  onSelectSector: (id: SectorId) => void;
}) {
  const { items } = useReveillon();
  const viewport = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [camera, setCamera] = useState<Camera>({ x: 535, y: 725, width: 1490 });
  const [floor, setFloor] = useState<"lower" | "upper" | "all">("all");
  const pointers = useRef(new Map<number, Point>());
  const moved = useRef(false);
  const startPoint = useRef<Point | null>(null);
  const aspect = size.width / size.height;
  const height = camera.width / aspect;
  const scale = camera.width / size.width;

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width > 0 && entry.contentRect.height > 0)
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const match = sectorConfig.find((item) => item.id === sector);
    if (match) {
      setCamera({
        x: match.x + match.width / 2,
        y: match.y + match.height / 2,
        width: Math.max(match.width + 80, (match.height + 80) * aspect),
      });
      return;
    }
    if (floor === "all")
      setCamera({ x: 535, y: 725, width: Math.max(1100, 1490 * aspect) });
    else if (size.width < 500)
      setCamera({
        x: 225,
        y: (floor === "lower" ? 0 : 785) + 240 / aspect,
        width: 480,
      });
    else
      setCamera({
        x: 535,
        y: floor === "lower" ? 388 : 1118,
        width: Math.max(1100, (floor === "lower" ? 790 : 685) * aspect),
      });
  }, [sector, floor, aspect, size.width]);

  const keepInBounds = (next: Camera): Camera => ({
    width: clamp(next.width, 200, 2300),
    x: clamp(next.x, 0, 1070),
    y: clamp(next.y, 0, 1470),
  });
  function zoom(factor: number) {
    setCamera((previous) =>
      keepInBounds({ ...previous, width: previous.width * factor }),
    );
  }
  function onPointerDown(event: PointerEvent<SVGSVGElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (!pointers.current.size) {
      moved.current = false;
      startPoint.current = { x: event.clientX, y: event.clientY };
    }
    pointers.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });
    // Capture on the original target so a stationary tap still reaches the sector.
    (event.target as Element).setPointerCapture(event.pointerId);
  }
  function onPointerMove(event: PointerEvent<SVGSVGElement>) {
    const oldPoint = pointers.current.get(event.pointerId);
    if (!oldPoint) return;
    const before = Array.from(pointers.current.values());
    pointers.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });
    if (
      startPoint.current &&
      Math.hypot(
        event.clientX - startPoint.current.x,
        event.clientY - startPoint.current.y,
      ) > 5
    )
      moved.current = true;
    if (pointers.current.size > 1) {
      moved.current = true;
      const after = Array.from(pointers.current.values());
      const oldDistance = Math.hypot(
        before[0].x - before[1].x,
        before[0].y - before[1].y,
      );
      const newDistance = Math.hypot(
        after[0].x - after[1].x,
        after[0].y - after[1].y,
      );
      const bounds = viewport.current!.getBoundingClientRect();
      const oldX = (before[0].x + before[1].x) / 2 - bounds.left;
      const oldY = (before[0].y + before[1].y) / 2 - bounds.top;
      const newX = (after[0].x + after[1].x) / 2 - bounds.left;
      const newY = (after[0].y + after[1].y) / 2 - bounds.top;
      if (oldDistance > 0 && newDistance > 0)
        setCamera((previous) => {
          const width = clamp(
            (previous.width * oldDistance) / newDistance,
            200,
            2300,
          );
          return keepInBounds({
            width,
            x:
              previous.x +
              ((oldX - size.width / 2) * previous.width) / size.width -
              ((newX - size.width / 2) * width) / size.width,
            y:
              previous.y +
              ((oldY - size.height / 2) * previous.width) / size.width -
              ((newY - size.height / 2) * width) / size.width,
          });
        });
    } else if (moved.current) {
      setCamera((previous) =>
        keepInBounds({
          ...previous,
          x:
            previous.x -
            ((event.clientX - oldPoint.x) * previous.width) / size.width,
          y:
            previous.y -
            ((event.clientY - oldPoint.y) * previous.width) / size.width,
        }),
      );
    }
  }
  const activeSector = sectorConfig.find((item) => item.id === sector);

  return (
    <div className="rv-map-card">
      <div className="rv-map-topbar">
        <div>
          <span className="rv-map-live-dot" />
          <strong>Explore o Zin</strong>
          <span className="rv-map-top-sub">Encontre o seu setor</span>
        </div>
        <span className="rv-mock-pill">MAPA ILUSTRATIVO</span>
      </div>
      <div className="rv-floor-tabs" role="group" aria-label="Áreas do mapa">
        {[
          ["lower", "Salão & varanda"],
          ["upper", "Bilhar & mezanino"],
          ["all", "Mapa completo"],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            aria-pressed={!sector && floor === value}
            onClick={() => {
              onSectorChange(null);
              setFloor(value as typeof floor);
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="rv-map-viewport" ref={viewport}>
        <svg
          aria-label="Mapa interativo dos setores do Zin Bar & Restaurante. Arraste para explorar e use os controles para ampliar."
          viewBox={`${camera.x - camera.width / 2} ${camera.y - height / 2} ${camera.width} ${height}`}
          className="rv-venue-svg"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={(event) => pointers.current.delete(event.pointerId)}
          onPointerCancel={(event) => pointers.current.delete(event.pointerId)}
          onLostPointerCapture={(event) =>
            pointers.current.delete(event.pointerId)
          }
          onClickCapture={(event) => {
            if (moved.current) {
              event.stopPropagation();
              moved.current = false;
            }
          }}
          onKeyDown={(event) => {
            if (event.target !== event.currentTarget) return;
            const shift = camera.width / 10;
            if (
              [
                "ArrowLeft",
                "ArrowRight",
                "ArrowUp",
                "ArrowDown",
                "+",
                "-",
              ].includes(event.key)
            )
              event.preventDefault();
            if (event.key === "+") zoom(0.8);
            else if (event.key === "-") zoom(1.25);
            else if (event.key.startsWith("Arrow"))
              setCamera((previous) =>
                keepInBounds({
                  ...previous,
                  x:
                    previous.x +
                    (event.key === "ArrowRight"
                      ? shift
                      : event.key === "ArrowLeft"
                        ? -shift
                        : 0),
                  y:
                    previous.y +
                    (event.key === "ArrowDown"
                      ? shift
                      : event.key === "ArrowUp"
                        ? -shift
                        : 0),
                }),
              );
          }}
          tabIndex={0}
        >
          <defs>
            <pattern
              id="rv-dance-grid"
              width="14"
              height="14"
              patternUnits="userSpaceOnUse"
            >
              <rect width="14" height="14" fill="#221b1c" />
              <path
                d="M14 0H0V14"
                fill="none"
                stroke="#4a3c3b"
                strokeWidth=".8"
              />
            </pattern>
          </defs>
          {sectorConfig.map((item) => (
            <VenueSectorShape
              key={item.id}
              sector={item}
              dimmed={!!sector && sector !== item.id}
              inCart={items.some((cartItem) => cartItem.sectorId === item.id)}
              scale={scale}
              onSelect={onSelectSector}
            />
          ))}
          <VenueLandmarks scale={scale} />
        </svg>
        <div className="rv-map-controls">
          <button
            type="button"
            aria-label="Ampliar mapa"
            onClick={() => zoom(0.78)}
            disabled={camera.width <= 200}
          >
            +
          </button>
          <button
            type="button"
            aria-label="Reduzir mapa"
            onClick={() => zoom(1.28)}
            disabled={camera.width >= 2300}
          >
            −
          </button>
          <button
            type="button"
            aria-label="Ver mapa completo"
            onClick={() => {
              onSectorChange(null);
              setFloor("all");
              setCamera({
                x: 535,
                y: 725,
                width: Math.max(1100, 1490 * aspect),
              });
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M9 4H4v5M15 4h5v5M4 15v5h5M20 15v5h-5" />
            </svg>
          </button>
        </div>
        <div className="rv-map-instructions">
          {activeSector
            ? `SETOR ${activeSector.id} · ${activeSector.name}`
            : "ARRASTE PARA EXPLORAR"}
          <span>Use + / − ou dois dedos para ampliar</span>
        </div>
        <span className="rv-map-edge-fade rv-map-edge-fade-left" aria-hidden="true" />
        <span className="rv-map-edge-fade rv-map-edge-fade-right" aria-hidden="true">
          <span className="rv-map-edge-chevron">›</span>
        </span>
      </div>
      <div className="rv-map-legend" aria-label="Legenda do mapa">
        <span>
          <i className="rv-legend-available" />
          Disponível
        </span>
        <span>
          <i className="rv-legend-selected" />
          Sua seleção
        </span>
        <span>
          <i className="rv-legend-unavailable" />
          Esgotado
        </span>
      </div>
      <p className="rv-map-sector-note">
        A seleção e a compra acontecem por setor — toque em qualquer ponto do
        setor para escolher. A mesa exata é definida pela equipe do Zin no dia
        do evento.
      </p>
    </div>
  );
}
