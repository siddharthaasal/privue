interface ChallengeCardProps {
    heading: string;
    description: string;
    icon?: string;
}

export default function ChallengeCard({ heading, description, icon }: ChallengeCardProps) {
    return (
        <div className="flex flex-col items-start gap-12 px-6 py-12 mx-auto text-left">
            <img src={icon ? icon : "/solutions/lock.svg"} alt="" className="w-10 h-10" />

            <div>
                <p className="font-medium text-lg mb-1 tracking-normal">{heading}</p>
                <p className="font-normal text-[15px]">{description}</p>
            </div>
        </div>
    );
}
