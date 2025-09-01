interface ProblemCardProps {
    icon: string; // path to the icon
    heading: string;
    description: string;
}

export default function ProblemCard({ icon, heading, description }: ProblemCardProps) {
    return (
        <div className="flex flex-col items-start px-8 py-12 gap-16 border-r-[1px] border-gray-200 text-left">
            {/* Icon */}
            <img src={icon} alt="" className="w-8 h-8" />

            {/* Text */}
            <div>
                <p className="font-semibold text-lg mb-1 tracking-tight">{heading}</p>
                <p className="font-normal text-base">{description}</p>
            </div>

        </div>
    );
}
