interface Props {
  selected: string;
  onSelect: (tab: string) => void;
}

const tabs = ['🔥 Featured', '🚀 Top Gainers', '🚨 Top Losers'];

const CryptoTabs = ({ selected, onSelect }: Props) => (
  <div className="flex mb-6 border-b border-gray-700 text-sm font-medium w-full overflow-x-auto">
    {tabs.map((label) => (
      <button
        key={label}
        className={`whitespace-nowrap px-4 py-2 mr-2 rounded-t-md ${
          selected === label
            ? 'text-yellow-400 border-b-2 border-yellow-400'
            : 'text-gray-400 hover:text-white'
        }`}
        onClick={() => onSelect(label)}
      >
        {label}
      </button>
    ))}
  </div>
);

export default CryptoTabs;
