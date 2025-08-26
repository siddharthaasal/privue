interface CapabilitiesCardProps {
    icon: string; // path to the icon
    heading: string;
    subheading: string;
}

export default function CapabilitiesCard({ icon, heading, subheading }: CapabilitiesCardProps) {
    return (
        <div className="flex flex-col items-start gap-6 p-4 text-left">
            {/* Icon */}
            <img src={icon} alt="" className="w-11 h-11" />

            {/* Text */}
            <div className="">
                <p className="font-semibold text-lg mb-2 leading-tight">{heading}</p>
                <p className="font-normal text-base">{subheading}</p>
            </div>
        </div>
    );
}
