interface ChallengeCardProps {
    heading: string;
    description: string;
}

export default function ChallengeCard({ heading, description }: ChallengeCardProps) {
    return (
        <div className="flex flex-col items-start gap-2 px-12 py-12 mx-auto text-left">
            <p className="font-medium text-lg">{heading}</p>
            <p className="font-normal text-base">{description}</p>
        </div>
    );
}
