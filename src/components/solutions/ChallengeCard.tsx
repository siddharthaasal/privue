interface ChallengeCardProps {
    heading: string;
    description: string;
}

export default function ChallengeCard({ heading, description }: ChallengeCardProps) {
    return (
        <div className="flex flex-col items-start gap-2 px-8 py-12 text-left border-x-[0.5px] border-gray-200">
            <p className="font-medium text-lg">{heading}</p>
            <p className="font-normal text-base">{description}</p>
        </div>
    );
}
