import { createBrowserHistory } from 'history';
import { BASENAME } from '../globals/config';
const history = createBrowserHistory({ basename: BASENAME });
export default history;
