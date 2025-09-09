'use client'

import { useMemo } from 'react'
import ReactFlow, {
    Background,
    useNodesState,
    useEdgesState,
    type Node,
    type Edge,
    type EdgeProps,
    getBezierPath,
    Position,
    Controls,
} from 'reactflow'
import 'reactflow/dist/style.css'

/* --------------------------
   Types for node data
   -------------------------- */
type SchemaNodeData = {
    title: string
    rows: string[]
}

type AggregationNodeData = {
    title: string
    subtitle?: string
}

/* --------------------------
   Schema node: a DB-like block
   -------------------------- */
function SchemaNode({ data }: { data: SchemaNodeData }) {
    return (
        <div className="select-none pointer-events-none w-72">
            <div className="rounded-2xl border border-gray-200 dark:border-zinc-700 overflow-hidden shadow-sm">
                {/* header */}
                <div className="px-4 py-3 bg-gradient-to-b from-white/60 to-white/40 dark:from-zinc-800/40">
                    <div className="text-sm font-semibold text-slate-900">Source Data</div>
                    <div className="text-xs text-slate-500 mt-0.5">ingest / raw sources</div>
                </div>

                {/* rows (like schema table rows) */}
                <div className="bg-white dark:bg-transparent">
                    {data.rows.map((r, idx) => (
                        <div
                            key={r}
                            className={`flex items-center justify-between px-4 py-3 text-sm ${idx % 2 === 0 ? 'bg-transparent' : 'bg-slate-50/40'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-2.5 w-2.5 rounded-full bg-privue-600" />
                                <div className="text-slate-800 dark:text-slate-200 truncate">{r}</div>
                            </div>

                            <div className="text-xs text-slate-400">source</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

/* --------------------------
   Aggregation node
   -------------------------- */
function AggregationNode({ data }: { data: AggregationNodeData }) {
    return (
        <div className="select-none pointer-events-none w-80">
            <div className="rounded-2xl bg-gradient-to-b from-white/50 to-white/30 border border-gray-200 dark:border-zinc-700 p-4 shadow-md">
                <div className="flex items-start gap-3">
                    <div className="flex-1">
                        <div className="text-base font-semibold text-slate-900">{data.title}</div>
                        {data.subtitle && <div className="text-sm text-slate-500 mt-1">{data.subtitle}</div>}
                    </div>

                    <div className="flex-shrink-0">
                        <div className="h-9 w-9 rounded-md bg-privue-100 flex items-center justify-center">
                            <svg width="18" height="18" viewBox="0 0 24 24" className="text-privue-700" aria-hidden>
                                <path d="M4 6h16M4 12h10M4 18h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

/* --------------------------
   Custom Edge (Bezier) using getBezierPath
   - moved out of component so reference is stable
   -------------------------- */
function CustomAnimatedEdge({
    id,
    sourceX,
    sourceY,
    sourcePosition = Position.Right,
    targetX,
    targetY,
    targetPosition = Position.Left,
    style,
}: EdgeProps) {
    const [edgePath] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    })

    const stroke = (style as any)?.stroke ?? '#0ea5e9' // cyan-500 fallback
    const strokeWidth = (style as any)?.strokeWidth ?? 3
    const dash = (style as any)?.strokeDasharray ?? '8 6'

    return (
        <>
            <defs>
                <marker id={`arrow-${id}`} markerWidth="20" markerHeight="20" refX="10" refY="7" orient="auto">
                    <path d="M0,0 L0,14 L10,7 z" fill={stroke} />
                </marker>
            </defs>

            <path
                id={id}
                className="rf-edge-path"
                d={edgePath}
                fill="none"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={dash}
                markerEnd={`url(#arrow-${id})`}
            />
        </>
    )
}

/* --------------------------
   nodeTypes / edgeTypes
   - defined at module scope so they are stable between renders
   -------------------------- */
const nodeTypes = {
    schemaNode: (props: any) => <SchemaNode data={props.data} />,
    aggregationNode: (props: any) => <AggregationNode data={props.data} />,
}

const edgeTypes = {
    customAnimated: (props: any) => <CustomAnimatedEdge {...props} />,
}

/* --------------------------
   Main component
   -------------------------- */
export default function LeftSchemaAggregationGraph() {
    const nodesInitial: Node[] = useMemo(
        () => [
            {
                id: 'schema',
                type: 'schemaNode',
                data: {
                    title: 'Source Data',
                    rows: ['Structured Data', 'Unstructured Data', "Privue's Prop. Data", 'Third Party Data'],
                } as SchemaNodeData,
                position: { x: 40, y: 80 },
                draggable: false,
                selectable: false,
            },
            {
                id: 'aggregation',
                type: 'aggregationNode',
                data: { title: 'Data Aggregation', subtitle: 'Normalization · Enrichment · Indexing' } as AggregationNodeData,
                position: { x: 360, y: 120 },
                draggable: false,
                selectable: false,
            },
        ],
        []
    )

    const edgesInitial: Edge[] = useMemo(
        () => [
            {
                id: 'e-schema-agg',
                source: 'schema',
                target: 'aggregation',
                type: 'customAnimated',
                style: {
                    stroke: '#0ea5e9',
                    strokeWidth: 3,
                    strokeDasharray: '8 6',
                },
                selectable: false,
            },
        ],
        []
    )

    const [nodes] = useNodesState(nodesInitial)
    const [edges] = useEdgesState(edgesInitial)

    return (
        <div className="w-full h-[520px] rounded-2xl overflow-hidden relative">
            <style>{`
        .rf-edge-path {
          animation: dash-move 1.2s linear infinite;
        }
        @keyframes dash-move {
          to { stroke-dashoffset: -28; }
        }
      `}</style>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView
                attributionPosition="bottom-left"
                nodesDraggable={false}
                nodesConnectable={false}
                // nodesSelectable={false}
                edgesFocusable={false}
                onNodesChange={() => { }}
                onEdgesChange={() => { }}
                onConnect={() => { }}
                // disable interactivity
                panOnDrag={false}
                zoomOnScroll={false}
                panOnScroll={false}
                zoomOnPinch={false}
                panOnScrollSpeed={0}
                minZoom={1}
                maxZoom={1}
            >
                <Background gap={16} size={1} color="#f1f5f9" />
                <Controls showInteractive={false} />
            </ReactFlow>
        </div>
    )
}
