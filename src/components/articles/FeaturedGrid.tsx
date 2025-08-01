import FeaturedCard from "./FeaturedCard";
import im1 from "/articlesFeatureImages/undraw_data-reports_l2u3.svg";
import scm from "/articlesFeatureImages/undraw_financial-data_lbci.svg";
import dataAnalysis from "/articlesFeatureImages/undraw_firewall_cfej.svg";
import dataReport from "/articlesFeatureImages/undraw_report_k55w.svg";
import setupAnalytics from "/articlesFeatureImages/undraw_setup-analytics_ttg5.svg";
import personalInfo from "/articlesFeatureImages/undraw_personal-information_h7kf.svg";
import annotation from "/articlesFeatureImages/undraw_annotation_rz2w.svg";


export default function ArticleGrid() {
    return (
        <div className="h-auto w-full max-w-screen-xl py-8 px-24 grid grid-cols-4 grid-rows-2 gap-4">
            {/* Row 1 */}
            <div className="col-span-2 row-span-1">
                <FeaturedCard
                    title="Credit Risk Assessment"
                    description="Explore how Privue helps you with the Credit Risk Assessment"
                    url="/test"
                    coverImage={setupAnalytics}
                    variant="lg"
                />
            </div>
            <div className="col-span-1 row-span-1">
                <FeaturedCard
                    title="Credit Risk Assessment"
                    description="Explore how Privue helps you with the Credit Risk Assessment"
                    url="/test"
                    coverImage={scm}
                />
            </div>
            <div className="col-span-1 row-span-1">
                <FeaturedCard
                    title="Credit Risk Assessment"
                    description="Explore how Privue helps you with the Credit Risk Assessment"
                    url="/test"
                    coverImage={im1}
                />
            </div>

            {/* Row 2 */}
            <div className="col-span-1">
                <FeaturedCard
                    title="Credit Risk Assessment"
                    description="Explore how Privue helps you with the Credit Risk Assessment"
                    url="/test"
                    coverImage={dataReport}
                />
            </div>
            <div className="col-span-1">
                <FeaturedCard
                    title="Credit Risk Assessment"
                    description="Explore how Privue helps you with the Credit Risk Assessment"
                    url="/test"
                    coverImage={dataAnalysis}
                />
            </div>
            <div className="col-span-1">
                <FeaturedCard
                    title="Credit Risk Assessment"
                    description="Explore how Privue helps you with the Credit Risk Assessment"
                    url="/test"
                    coverImage={personalInfo}
                />
            </div>
            <div className="col-span-1">
                <FeaturedCard
                    title="Credit Risk Assessment"
                    description="Explore how Privue helps you with the Credit Risk Assessment"
                    url="/test"
                    coverImage={annotation}
                />
            </div>
        </div>
    );
}
