import { configureStore } from '@reduxjs/toolkit';

import { addonReducer } from 'addon/states/slc_addons';
import { addonModalReducer } from 'addon/states/slc_addonModal';
import { serviceReducer } from 'services/states/slc_services';
import { addServiceModalReducer } from 'services/states/slc_serviceModal';

export const store = configureStore({
    reducer: {
        // Add reducers here
        service: serviceReducer,
        addServiceModal: addServiceModalReducer,
        addon: addonReducer,
        addonModal: addonModalReducer,
    },
});

export const RootState = typeof store.getState;
export const AppDispatch = typeof store.dispatch;
