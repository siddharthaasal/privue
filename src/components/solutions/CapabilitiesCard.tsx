interface CapabilitiesCardProps {
    icon: string; // path to the icon
    desc: string;
}

export default function CapabilitiesCard({ icon, desc }: CapabilitiesCardProps) {
    return (
        <div className="flex flex-col items-start gap-6 px-4 text-left">
            {/* Icon */}
            <img src={icon} alt="" className="w-11 h-11" />

            {/* Text */}
            <div className="">
                {<p className="font-medium text-base tracking-normal">{desc}</p>}
            </div>
        </div>
    );
}
