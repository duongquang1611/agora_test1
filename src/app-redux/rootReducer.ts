import { combineReducers } from 'redux';
import resource from './resource/reducer';
import userInfo from './userInfo/reducer';
import common from './common/reducer';
import blacklist from './blacklist/reducer';
import transfer from './transfer/reducer';
import product from './product/reducer';
import notification from './notification/reducer';
import history from './history/reducer';

const rootReducer = combineReducers({
    resource,
    userInfo,
    common,
    blacklist,
    transfer,
    product,
    notification,
    history,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
