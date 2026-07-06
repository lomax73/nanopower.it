// Deterministic hex-lattice: nodes sit on a triangular grid (the packing
// pattern real nanomaterials form at molecular scale) and connect to their
// nearest neighbours, evoking a lab micrograph rather than generic "floating dots".

const COLS = 14;
const ROWS = 9;
const SPACING = 90;
const JITTER = [0.4, -0.3, 0.2, -0.45, 0.15, -0.2, 0.35, -0.1];

type Node = { id: string; x: number; y: number };

function buildNodes(): Node[] {
  const nodes: Node[] = [];
  for (let row = 0; row < ROWS; row++) {
    const rowOffset = row % 2 === 0 ? 0 : SPACING / 2;
    for (let col = 0; col < COLS; col++) {
      const jitterX = JITTER[(row * COLS + col) % JITTER.length] * 10;
      const jitterY = JITTER[(row * COLS + col + 3) % JITTER.length] * 10;
      nodes.push({
        id: `${row}-${col}`,
        x: col * SPACING + rowOffset + jitterX,
        y: row * SPACING * 0.85 + jitterY,
      });
    }
  }
  return nodes;
}

function distance(a: Node, b: Node) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function buildEdges(nodes: Node[]) {
  const edges: { from: Node; to: Node; key: string }[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const d = distance(nodes[i], nodes[j]);
      if (d < SPACING * 1.05) {
        edges.push({ from: nodes[i], to: nodes[j], key: `${nodes[i].id}_${nodes[j].id}` });
      }
    }
  }
  return edges;
}

const NODES = buildNodes();
const EDGES = buildEdges(NODES);
const WIDTH = (COLS - 1) * SPACING + SPACING / 2;
const HEIGHT = (ROWS - 1) * SPACING * 0.85;

export default function MolecularLattice() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, #1A2F4A 0%, #0D1F33 70%)",
        }}
      />
      <div
        className="nano-lattice absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60"
        style={{ width: WIDTH * 1.4, height: HEIGHT * 1.4 }}
      >
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <g stroke="#00A896" strokeOpacity="0.16" strokeWidth="1">
            {EDGES.map((e) => (
              <line key={e.key} x1={e.from.x} y1={e.from.y} x2={e.to.x} y2={e.to.y} />
            ))}
          </g>
          <g fill="#00A896">
            {NODES.map((n, i) => (
              <circle
                key={n.id}
                className="nano-node"
                cx={n.x}
                cy={n.y}
                r={i % 7 === 0 ? 2.6 : 1.4}
                style={{ animationDelay: `${(i % 11) * 0.35}s` }}
              />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}
