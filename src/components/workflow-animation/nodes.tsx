import { type Node } from "reactflow";
// import { FaRegFilePdf } from "react-icons/fa6";
// import { PiMicrosoftExcelLogo } from "react-icons/pi";
// import { MdFormatAlignCenter } from "react-icons/md";
// import { FaRobot, FaDatabase } from "react-icons/fa";
// import { BsDatabaseCheck } from "react-icons/bs";
// import { ChartCandlestick, CloudLightning, Scale, BanknoteArrowUp, ScanText, Bot, DatabaseZap } from 'lucide-react';
import { ScanText, Bot, DatabaseZap } from 'lucide-react';

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
            // icon: FaRegFilePdf
            icon: "/icons/pdf-2.png"
        },
        // parentNode: "group-1",
        // extent: "parent",
    },
    {
        id: "structured",
        type: "dataNode",
        position: { x: 80, y: 180 },
        data: {
            label: "Structured Data",
            // icon: PiMicrosoftExcelLogo
            icon: "/icons/excel.png"
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
            icon: ScanText
        },
    },

    {
        id: "llm",
        type: "dataNodeLR",
        position: { x: 320, y: 40 },
        data: {
            label: "LLM Parsing",
            icon: Bot
            // icon: "/icons/robot-2.png"
        },
    },

    {
        id: "privue",
        type: "dataNode",
        position: { x: 80, y: 320 },
        data: {
            label: "Proprietary Data",
            // icon: BsDatabaseCheck
            icon: "/icons/postgre.png"
        },
    },
    {
        id: "thirdparty",
        type: "dataNode",
        position: { x: 80, y: 460 },
        data: {
            label: "Third Party Data",
            icon: DatabaseZap
            // icon: "/icons/database-2.png"
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
        position: { x: 428, y: 443 },
        data: {
            label: "AI Agent",
            // icon: FaRobot
            icon: "/icons/gpt.png"
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
        data: {
            title: "Credit Risk",
            // icon: BanknoteArrowUp
            icon: "/icons/credit-risk-2.png"
        }
    },
    {
        id: "tool-b",
        type: "toolNode",
        position: { x: 700, y: 420 },
        data: {
            title: "Compliance Risk",
            // icon: Scale
            icon: "/icons/compliance-risk.png"
        }
    },
    {
        id: "tool-c",
        type: "toolNode",
        position: { x: 850, y: 420 },
        data: {
            title: "Climate Risk",
            // icon: CloudLightning
            icon: "/icons/climate-risk.png"
        }
    },
    {
        id: "tool-d",
        type: "toolNode",
        position: { x: 1000, y: 420 },
        data: {
            title: "Financial Engine",
            // icon: ChartCandlestick
            icon: "/icons/financial-engine.png"
        }
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