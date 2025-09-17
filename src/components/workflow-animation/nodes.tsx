import { type Node } from "reactflow";
import { ClipboardPlus } from 'lucide-react';

export const initialNodes: Node[] = [
    {
        id: "unstructured",
        type: "dataNode",
        position: { x: 80, y: 40 },
        data: {
            label: "Unstructured Data",
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
            label: "OCR",
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
            label: "LLM Parsing",
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
            label: "Structured Data",
            icon: ClipboardPlus,
            // icons: [
            //     { id: "file", label: "Email" },
            //     { id: "img", label: "Docs" },
            //     { id: "db", label: "OCR" },
            //     { id: "cloud", label: "Scrapes" },
            // ],
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
        position: { x: 350, y: 180 },
        data: { label: "Unified Data Platform" },
    },

    {
        id: "ai-agent",
        type: "secDataNode",
        position: { x: 325, y: 450 },
        data: {
            label: "AI Agent",
            icons: [
                { id: "cloud", label: "Vendors" },
                { id: "file", label: "Feeds" },
                { id: "db", label: "Partners" },
                { id: "img", label: "APIs" },
            ],
        },
    },

    {
        id: "agent",
        type: "agentNode",
        position: { x: 700, y: 100 }, // tune Y so children sit below
        data: {
            title: "Models & Engines",
        }
    },

    {
        id: "tool-a",
        type: "toolNode",
        position: { x: 550, y: 420 },
        data: { title: "Credit Risk", }
    },
    {
        id: "tool-b",
        type: "toolNode",
        position: { x: 700, y: 420 },
        data: { title: "Compliance Risk", }
    },
    {
        id: "tool-c",
        type: "toolNode",
        position: { x: 850, y: 420 },
        data: { title: "Climate Risk", }
    },
    {
        id: "tool-d",
        type: "toolNode",
        position: { x: 1000, y: 420 },
        data: { title: "Financial Engine", }
    },
    {
        id: "live-chat",
        type: "chatNode",
        position: { x: 1100, y: 75 },
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