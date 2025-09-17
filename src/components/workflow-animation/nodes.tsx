import { type Node } from "reactflow";

export const initialNodes: Node[] = [
    {
        id: "unstructured",
        type: "dataNode",
        position: { x: 80, y: 40 },
        data: {
            label: "Structured Data",
            icons: [
                { id: "file", label: "CSV" },
                { id: "img", label: "Charts" },
                { id: "db", label: "DB" },
                { id: "cloud", label: "API" },
            ],
        },
    },
    {
        id: "ocr",
        type: "dataNode",
        position: { x: 200, y: 40 },
        data: {
            label: "Structured Data",
            icons: [
                { id: "file", label: "CSV" },
                { id: "img", label: "Charts" },
                { id: "db", label: "DB" },
                { id: "cloud", label: "API" },
            ],
        },
    },
    {
        id: "llm",
        type: "dataNode",
        position: { x: 320, y: 40 },
        data: {
            label: "Structured Data",
            icons: [
                { id: "file", label: "CSV" },
                { id: "img", label: "Charts" },
                { id: "db", label: "DB" },
                { id: "cloud", label: "API" },
            ],
        },
    },
    {
        id: "structured",
        type: "dataNode",
        position: { x: 80, y: 180 },
        data: {
            label: "Unstructured Data",
            icons: [
                { id: "file", label: "Email" },
                { id: "img", label: "Docs" },
                { id: "db", label: "OCR" },
                { id: "cloud", label: "Scrapes" },
            ],
        },
    },
    {
        id: "privue",
        type: "dataNode",
        position: { x: 80, y: 320 },
        data: {
            label: "Privue's Proprietary Data",
            icons: [
                { id: "db", label: "Proprietary DB" },
                { id: "file", label: "Signals" },
                { id: "cloud", label: "Streams" },
                { id: "img", label: "Enriched" },
            ],
        },
    },
    {
        id: "thirdparty",
        type: "dataNode",
        position: { x: 80, y: 460 },
        data: {
            label: "Third Party Data",
            icons: [
                { id: "cloud", label: "Vendors" },
                { id: "file", label: "Feeds" },
                { id: "db", label: "Partners" },
                { id: "img", label: "APIs" },
            ],
        },
    },

    // DbNode (static SVG) — REPLACES the previous "unified" data node
    {
        id: "unified",
        type: "dbNode",
        position: { x: 320, y: 220 },
        data: { label: "Unified Data Platform" },
    },

    // LLM Models (orbit)
    // {
    //     id: "llm-models",
    //     type: "orbitNode",
    //     position: { x: 640, y: 70 },
    //     data: {
    //         label: "LLM Runtimes",
    //         centerLogo: privueLogo,
    //         icons: [
    //             <div key="oai" style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}><IconOpenAI /></div>,
    //             <div key="llama" style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}><IconLlama /></div>,
    //             <div key="gemini" style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}><IconGemini /></div>,
    //             <div key="claude" style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}><IconClaude /></div>,
    //         ],
    //         radius: 72,
    //         iconSize: 32,
    //         duration: 20,
    //         reverse: false,
    //         speed: 1.1,
    //     },
    // },
    // {
    //     id: "all-llm",
    //     type: "agentNode",
    //     position: { x: 640, y: 150 }, // tune Y so children sit below
    //     data: {
    //         title: "AI Agents",
    //     }
    // },
    // Models bucket is to the right / below the LLMs
    // {
    //     id: "models",
    //     type: "modelsNode",
    //     position: { x: 640, y: 370 },
    //     data: {
    //         label: "Models",
    //         models: fullModels,
    //         visible: 3,
    //         intervalMs: 2000,
    //         width: 320,
    //         animation: "vertical",
    //     },
    // },
    {
        id: "agent",
        type: "agentNode",
        position: { x: 640, y: 150 }, // tune Y so children sit below
        data: {
            title: "Models & Engines",
        }
    },
    // {
    //     id: "llm-a",
    //     type: "toolNode",
    //     position: { x: 500, y: -45 },
    //     data: { title: "OpenAI" }
    // },
    // {
    //     id: "llm-b",
    //     type: "toolNode",
    //     position: { x: 650, y: -45 },
    //     data: { title: "Claude" }
    // },
    // {
    //     id: "llm-c",
    //     type: "toolNode",
    //     position: { x: 800, y: -45 },
    //     data: { title: "Gemini" }
    // },
    // {
    //     id: "llm-d",
    //     type: "toolNode",
    //     position: { x: 950, y: -45 },
    //     data: { title: "LLaMa" }
    // },
    // children tool nodes (branch targets)
    {
        id: "tool-a",
        type: "toolNode",
        position: { x: 500, y: 520 },
        data: { title: "Credit Risk", subtitle: "Conversational UI" }
    },
    {
        id: "tool-b",
        type: "toolNode",
        position: { x: 650, y: 520 },
        data: { title: "Compliance Risk", subtitle: "Documentation" }
    },
    {
        id: "tool-c",
        type: "toolNode",
        position: { x: 800, y: 520 },
        data: { title: "Climate Risk", subtitle: "Existing Details" }
    },
    {
        id: "tool-d",
        type: "toolNode",
        position: { x: 950, y: 520 },
        data: { title: "Financial Engine", subtitle: "Existing Details" }
    },
    // response node
    // {
    //     id: "response",
    //     type: "responseNode",
    //     position: { x: 1100, y: 200 }, // tweak coordinates to place it visually where you like
    //     data: {
    //         title: "RESPONSE",
    //         items: [
    //             { id: "resp1", Icon: (<DbIconDummy size={20} />), title: "Delivered via API", subtitle: "to Client System" },
    //             { id: "resp2", Icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" /></svg>), title: "Specific response", subtitle: "on the interface" },
    //             { id: "resp3", Icon: (<FileText size={20} />), title: "Custom report", subtitle: "or pre-compiled" },
    //         ],
    //     },
    // },
    {
        id: "live-chat",
        type: "chatNode",
        position: { x: 1100, y: 100 },
        data: {
            outgoing: "Hey, is it possible to expense office rent through my startup?",
            incoming: "Yes — you can expense rent as a business expense if it meets local rules.",
            timestamp: new Date().toISOString(), // or a specific ISO string like "2025-09-16T10:55:00.000Z"
            status: "delivered",
            timings: {
                showOutgoing: 180,   // show outgoing after 180ms
                moveUpAfter: 1000,    // move outgoing up after 800ms
                showReplyAfter: 2500,// show reply after 1700ms
                loopPause: 1200      // wait 1200ms before restarting the loop
            },
            maxWidth: 620, // px
            name: "Privue's AI",
        }
    }
];