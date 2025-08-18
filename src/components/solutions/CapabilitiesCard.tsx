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
                <p className="font-medium text-xl 2xl:text-2xl mb-2 leading-tight">{heading}</p>
                <p className="font-normal text-[15px]">{subheading}</p>
            </div>
        </div>
    );
}
