interface ProblemCardProps {
    icon: string; // path to the icon
    text: string;
}

export default function ProblemCard({ icon, text }: ProblemCardProps) {
    return (
        <div className="flex flex-col items-start px-12 py-12 gap-20 border-r-[1px] border-gray-200 text-left">
            {/* Icon */}
            <img src={icon} alt="" className="w-8 h-8" />

            {/* Text */}
            <p className="font-semibold text-xl">{text}</p>
        </div>
    );
}
