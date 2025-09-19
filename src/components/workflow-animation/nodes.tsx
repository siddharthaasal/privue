import { type Node } from "reactflow";
import { FaRegFilePdf } from "react-icons/fa6";
import { PiMicrosoftExcelLogo } from "react-icons/pi";
import { MdFormatAlignCenter } from "react-icons/md";
import { FaRobot, FaDatabase } from "react-icons/fa";
import { BsDatabaseCheck } from "react-icons/bs";
import { ChartCandlestick, CloudLightning, Scale, BanknoteArrowUp } from 'lucide-react';

export const initialNodes: Node[] = [
    // {
    //     id: "group-1",
    //     type: "boxNode",
    //     data: { label: "Internal Company Data" },
    //     position: { x: 25, y: 20 },
    // },
    {
        id: "unstructured",
        type: "dataNode",
        position: { x: 80, y: 40 },
        data: {
            label: "Unstructured Data",
            icon: FaRegFilePdf
        },
        // parentNode: "group-1",
        // extent: "parent",
    },
    {
        id: "ocr",
        type: "dataNodeLR",
        position: { x: 200, y: 40 },
        data: {
            label: "OCR",
            icon: MdFormatAlignCenter
        },
    },

    {
        id: "llm",
        type: "dataNodeLR",
        position: { x: 320, y: 40 },
        data: {
            label: "LLM Parsing",
            icon: FaRobot
        },
    },
    {
        id: "structured",
        type: "dataNode",
        position: { x: 80, y: 180 },
        data: {
            label: "Structured Data",
            icon: PiMicrosoftExcelLogo
        },
    },
    {
        id: "privue",
        type: "dataNode",
        position: { x: 80, y: 320 },
        data: {
            label: "Privue's Proprietary Data",
            icon: BsDatabaseCheck
        },
    },
    {
        id: "thirdparty",
        type: "dataNode",
        position: { x: 80, y: 460 },
        data: {
            label: "Third Party Data",
            icon: FaDatabase
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
        position: { x: 428, y: 448 },
        data: {
            label: "AI Agent",
            icon: FaRobot
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
        type: "toolNodeLeft",
        position: { x: 550, y: 420 },
        data: { title: "Credit Risk", icon: BanknoteArrowUp }
    },
    {
        id: "tool-b",
        type: "toolNode",
        position: { x: 700, y: 420 },
        data: { title: "Compliance Risk", icon: Scale }
    },
    {
        id: "tool-c",
        type: "toolNode",
        position: { x: 850, y: 420 },
        data: { title: "Climate Risk", icon: CloudLightning }
    },
    {
        id: "tool-d",
        type: "toolNode",
        position: { x: 1000, y: 420 },
        data: { title: "Financial Engine", icon: ChartCandlestick }
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