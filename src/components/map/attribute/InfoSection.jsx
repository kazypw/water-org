

const InfoSection = ({ title, children }) => (
    <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 pb-2 border-b border-gray-200" 
            style={{ color: 'var(--text-primary)' }}>
            {title}
        </h3>
        <div className="space-y-3">
            {children}
        </div>
    </div>
);

export default InfoSection;