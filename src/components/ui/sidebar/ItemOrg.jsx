import { memo } from 'react';

const ItemOrg = memo(({ item }) => {
  const logoUrl = item?.['Logo url'] || 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';
  const orgName = item?.['Organization name'] || 'Unknown Organization';
  const city = item?.['City'] || 'Unknown';
  const country = item?.['Country'] || 'Unknown';
  const focus = item?.['Focus'] || 'Unknown';
  const sector = item?.['Sector'] || 'Unknown';

  const cardFields = {
    'Location': `${city}, ${country}`,
    'Field of Focus': focus,
    'Sector': sector
  }

  return (
    <div className="group p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md hover:cursor-pointer hover:bg-[var(--bg-color)] transition-shadow duration-200 border border-gray-100">
      <div className="flex gap-4 items-center mb-[1rem]">
        <div className="flex-shrink-0">
          <img 
            className="w-16 h-16 object-contain rounded-lg bg-white p-1 border border-gray-200" 
            alt={`${orgName} logo`}
            src={logoUrl}
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-[var(--heading-color)] font-medium leading-tight text-[16px] group-hover:text-gray-900 transition-colors">
            {orgName}
          </h2>
        </div>
      </div>
      <div className='flex justify-between items-center'>
        {cardFields && (
          Object.entries(cardFields).map((item) => (
            <div className="flex-1 min-w-0">
              <h4 className='text-xs'>{item[0]}</h4>
              <p className='text-sm truncate leading-tight font-medium'>{item[1]}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
});

ItemOrg.displayName = 'ItemOrg';

export default ItemOrg;