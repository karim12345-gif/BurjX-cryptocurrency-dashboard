import { SvgIcon } from '@mui/material';

const ColoredCandlestickIcon = () => (
  <SvgIcon viewBox="0 0 24 24" sx={{ fontSize: 24 }}>
    {/* Green candle */}
    <rect x="5" y="5" width="5" height="12" fill="#A3E635" rx="1" />
    <line x1="7" y1="2" x2="7" y2="6" stroke="#A3E635" strokeWidth="1.5" />
    <line x1="7" y1="18" x2="7" y2="22" stroke="#A3E635" strokeWidth="1.5" />

    {/* Red candle */}
    <rect x="13.5" y="6" width="3" height="12" fill="#EF4444" rx="1" />
    <line x1="15" y1="2" x2="15" y2="6" stroke="#EF4444" strokeWidth="1.5" />
    <line x1="15" y1="18" x2="15" y2="22" stroke="#EF4444" strokeWidth="1.5" />
  </SvgIcon>
);

export default ColoredCandlestickIcon;
