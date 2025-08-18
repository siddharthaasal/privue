interface ChallengeCardProps {
    heading: string;
    subheading: string;
}

export default function ChallengeCard({ heading, subheading }: ChallengeCardProps) {
    return (
        <div className="flex flex-col items-start gap-4 px-8 pt-6 pb-20 text-left border-x-[0.5px] border-gray-200">
            <p className="font-semibold text-lg mb-1">{heading}</p>
            <p className="font-normal text-base">{subheading}</p>
        </div>
    );
}
