interface ChallengeCardProps {
    heading: string;
    description: string;
}

export default function ChallengeCard({ heading, description }: ChallengeCardProps) {
    return (
        <div className="flex flex-col items-start gap-2 px-6 py-12 mx-auto text-left">
            <p className="font-medium text-lg tracking-normal">{heading}</p>
            <p className="font-normal text-[15px]">{description}</p>
        </div>
    );
}
