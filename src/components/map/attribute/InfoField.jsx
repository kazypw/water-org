const InfoField = ({ label, value, isLink = false, linkType = 'url' }) => {
    if (!value) return null;

    const renderValue = () => {
    if (isLink && value !== 'N/A') {
        if (linkType === 'email') {
        return (
            <a 
            href={`mailto:${value}`}
            className="text-blue-500 hover:text-blue-600 underline break-all"
            >
                {value}
            </a>
        );
        } else if (linkType === 'phone') {
        return (
            <a 
            href={`tel:${value}`}
            className="text-blue-500 hover:text-blue-600 underline"
            >
                {value}
            </a>
        );
        } else {
        return (
            <a 
            href={value.startsWith('http') ? value : `https://${value}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 underline break-all"
            >
                {value}
            </a>
        );
        }
    }
        return <span className="break-words">{value}</span>;
    };

    return (
        <div className="flex flex-col gap-1">
            <span className="text-sm font-medium opacity-70">{label}</span>
            <div style={{ color: 'var(--text-secondary)' }}>
                {renderValue()}
            </div>
        </div>
    );
};

export default InfoField