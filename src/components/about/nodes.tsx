import { type Node } from "reactflow";
import { DatabaseZap } from 'lucide-react';

export const initialNodes: Node[] = [
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
    {
        id: "ai-layer",
        type: "aiLayerNode",
        position: { x: 200, y: 200 },
        data: { label: "AI Layer" },
    },
    {
        id: "live-chat",
        type: "chatNode",
        position: { x: 500, y: 75 },
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