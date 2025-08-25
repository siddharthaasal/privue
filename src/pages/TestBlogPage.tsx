// import ExpandingCard from "@/components/feature/FeatureExpandableCard";
import Layout from "@/components/Layout";
/**
 * ExpandingCards
 * Row‑scoped layout: each row is 12 cols → default 4 | 4 | 4.
 * On hover inside a row: hovered → 6, its siblings → 3 (other rows unchanged).
 * The last card of a row expands to the LEFT so it doesn't overflow.
 *
 * Details panel opens only for the hovered card (via group/card),
 * while the row shrinking is controlled by group/row.
 */
export default function TestPage() {
    return (
        <Layout>
            <>
                TestPage</>

        </Layout>
    )
}

