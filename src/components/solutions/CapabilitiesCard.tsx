interface CapabilitiesCardProps {
    icon: string; // path to the icon
    heading?: string;
    subheading?: string;
}

export default function CapabilitiesCard({ icon, heading, subheading }: CapabilitiesCardProps) {
    return (
        <div className="flex flex-col items-start gap-6 px-4 text-left">
            {/* Icon */}
            <img src={icon} alt="" className="w-11 h-11" />

            {/* Text */}
            <div className="">
                {heading && <p className="font-semibold text-lg mb-2 leading-tight">{heading}</p>}
                {subheading && <p className="font-medium text-base tracking-normal">{subheading}</p>}
            </div>
        </div>
    );
}
