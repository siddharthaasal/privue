interface CapabilitiesCardProps {
    icon: string; // path to the icon
    heading: string;
    subheading: string;
}

export default function CapabilitiesCard({ icon, heading, subheading }: CapabilitiesCardProps) {
    return (
        <div className="flex flex-col items-start gap-14 p-6 text-left border-x-[0.5px] border-gray-200">
            {/* Icon */}
            <img src={icon} alt="" className="w-8 h-8" />

            {/* Text */}
            <div className="">
                <p className="font-medium text-base mb-2">{heading}</p>
                <p className="font-normal text-sm">{subheading}</p>
            </div>
        </div>
    );
}
