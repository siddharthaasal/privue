interface ProblemCardProps {
    icon: string; // path to the icon
    heading: string;
    description: string;
}

export default function ProblemCard({ icon, heading, description }: ProblemCardProps) {
    return (
        <div className="flex flex-col items-start px-6 py-12 gap-12 text-left">
            <img src={icon} alt="" className="w-8 h-8" />

            <div>
                <p className="font-medium text-lg mb-1 tracking-normal">{heading}</p>
                <p className="font-normal text-[15px]">{description}</p>
            </div>

        </div>
    );
}
