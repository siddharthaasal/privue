const BoxNode = ({ data }: any) => {
    return (
        <div
            style={{
                border: "1px solid #4263eb",
                padding: "6px",
                borderRadius: "6px",
                background: "rgba(3, 105, 161, 0.05)",
                width: 150,
                height: 275,
                position: "relative",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    // textAlign: "center",
                    left: -50,
                    top: "40%",
                    transform: "rotate(-90deg)",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#0f172a",
                }}
            >
                {data.label}
            </div>
            {data.children}
        </div>
    );
};

export { BoxNode };
