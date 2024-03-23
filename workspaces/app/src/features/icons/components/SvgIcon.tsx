import ArrowBack from '@mui/icons-material/ArrowBack'
import NavigateNext from '@mui/icons-material/NavigateNext'
import Close from '@mui/icons-material/Close'
import Search from '@mui/icons-material/Search'
import Favorite from '@mui/icons-material/Favorite'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'

const Icons = {ArrowBack,NavigateNext, Close, Search, Favorite, FavoriteBorder }

type Props = {
  color: string;
  height: number;
  type: keyof typeof Icons;
  width: number;
};

export const SvgIcon: React.FC<Props> = ({ color, height, type, width }) => {
  // eslint-disable-next-line
  const Icon = Icons[type];
  return <Icon style={{ color, height, width }} />;
};
