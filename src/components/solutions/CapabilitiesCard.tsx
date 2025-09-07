interface CapabilitiesCardProps {
    icon: string; // path to the icon
    heading?: string;
    desc: string;
}

export default function CapabilitiesCard({ icon, heading, desc }: CapabilitiesCardProps) {
    return (
        <div className="flex flex-col items-start gap-6 px-4 text-left">
            {/* Icon */}
            <img src={icon} alt="" className="w-9 h-9" />

            {/* Text */}
            <div className="">
                {heading && <p className="font-medium text-base tracking-normal">{heading}</p>}
                {<p className="font-normal text-base tracking-normal">{desc}</p>}
            </div>
        </div>
    );
}
