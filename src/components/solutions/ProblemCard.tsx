interface ProblemCardProps {
    icon: string; // path to the icon
    text: string;
}

export default function ProblemCard({ icon, text }: ProblemCardProps) {
    return (
        <div className="flex flex-col items-start p-6  gap-14 border-r-[1px] border-gray-200 text-left">
            {/* Icon */}
            <img src={icon} alt="" className="w-8 h-8" />

            {/* Text */}
            <p className="font-medium text-lg">{text}</p>
        </div>
    );
}
