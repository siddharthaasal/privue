import CaseStudyRenderer from '@/components/articles/ArticleRenderer';
import CS1Content, { metadata } from '@/data/articles/cs1.mdx';
import Layout from '@/components/Layout';


export default function TestBlogPlage() {
    // const filePath = path.join(process.cwd(), '@/data/cs2.mdx');
    // const fileContent = fs.readFileSync('@/data/cs2.mdx', 'utf8');
    // const { data, content } = matter(fileContent);
    // console.log("type", typeof (CS1Content));
    // const file = matter.read('@data/cs2.mdx');
    // console.log("frontmatter parsing", data);

    return (
        <Layout>
            <div className="-mt-16">
                <CaseStudyRenderer metadata={metadata} Content={CS1Content} />
            </div>
        </Layout>
    );
}
