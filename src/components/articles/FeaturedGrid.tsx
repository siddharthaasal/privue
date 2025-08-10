import FeaturedCard from "./FeaturedCard";
import im1 from "/articlesFeatureImages/undraw_data-reports_l2u3.svg";
import scm from "/articlesFeatureImages/undraw_financial-data_lbci.svg";
import dataAnalysis from "/articlesFeatureImages/undraw_firewall_cfej.svg";
import dataReport from "/articlesFeatureImages/undraw_report_k55w.svg";
import setupAnalytics from "/articlesFeatureImages/undraw_setup-analytics_ttg5.svg";
import personalInfo from "/articlesFeatureImages/undraw_personal-information_h7kf.svg";
import annotation from "/articlesFeatureImages/undraw_annotation_rz2w.svg";
import { ExternalLink } from 'lucide-react';


export default function ArticleGrid() {
    return (
        <div className="mx-auto max-w-max">
            <div className="h-auto w-full mx-auto max-w-screen-2xl py-8 px-24 grid grid-cols-4 grid-rows-2 gap-4">
                {/* Row 1 */}
                <div className="col-span-2 row-span-1">
                    <FeaturedCard
                        title="Credit Risk Assessment"
                        description="Explore how Privue helps you with the Credit Risk Assessment"
                        url="/article"
                        coverImage={setupAnalytics}
                        variant="lg"
                    />
                </div>
                <div className="col-span-1 row-span-1">
                    <FeaturedCard
                        title="Credit Risk Assessment"
                        description="Explore how Privue helps you with the Credit Risk Assessment"
                        url="/article"
                        coverImage={scm}
                    />
                </div>
                <div className="col-span-1 row-span-1">
                    <FeaturedCard
                        title="Credit Risk Assessment"
                        description="Explore how Privue helps you with the Credit Risk Assessment"
                        url="/article"
                        coverImage={im1}
                    />
                </div>

                {/* Row 2 */}
                <div className="col-span-1">
                    <FeaturedCard
                        title="Credit Risk Assessment"
                        description="Explore how Privue helps you with the Credit Risk Assessment"
                        url="/article"
                        coverImage={dataReport}
                    />
                </div>
                <div className="col-span-1">
                    <FeaturedCard
                        title="Credit Risk Assessment"
                        description="Explore how Privue helps you with the Credit Risk Assessment"
                        url="/article"
                        coverImage={dataAnalysis}
                    />
                </div>
                <div className="col-span-1">
                    <FeaturedCard
                        title="Credit Risk Assessment"
                        description="Explore how Privue helps you with the Credit Risk Assessment"
                        url="/article"
                        coverImage={personalInfo}
                    />
                </div>
                <div className="col-span-1">
                    <FeaturedCard
                        title="Credit Risk Assessment"
                        description="Explore how Privue helps you with the Credit Risk Assessment"
                        url="/article"
                        coverImage={annotation}
                    />
                </div>
            </div>
            <a
                href="/articles"
                className="font-open-sans mx-auto group flex cursor-pointer justify-end items-center gap-2 px-26 text-foreground-lighter col-span-full pb-32"
            >
                <span className="text-sm text-[#707070] group-hover:text-[#171717] transition-colors duration-200">
                    Explore all Articles
                </span>
                <ExternalLink
                    className="text-[#707070] group-hover:text-[#171717] text-lg transition-colors duration-200"
                    size={14}
                />
            </a>

        </div>
    );
}
