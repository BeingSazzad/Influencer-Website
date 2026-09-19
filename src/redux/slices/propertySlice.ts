import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Property, PropertyFilterState } from '@/types';
import { MOCK_PROPERTIES } from '@/Mockdata';

interface PropertyState {
  properties: Property[];
  savedPropertyIds: string[];
  filters: PropertyFilterState;
  selectedProperty: Property | null;
}

const initialFilters: PropertyFilterState = {
  searchQuery: '',
  city: 'all',
  type: 'all',
  status: 'all',
  minPrice: 0,
  maxPrice: 50000000,
  bedrooms: 'all',
  bathrooms: 'all',
  amenities: [],
  sortBy: 'newest',
};

const initialState: PropertyState = {
  properties: MOCK_PROPERTIES,
  savedPropertyIds: ['prop-001', 'prop-002', 'prop-004'],
  filters: initialFilters,
  selectedProperty: null,
};

export const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<PropertyFilterState>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialFilters;
    },
    toggleSaveProperty: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.savedPropertyIds.includes(id)) {
        state.savedPropertyIds = state.savedPropertyIds.filter((pId) => pId !== id);
      } else {
        state.savedPropertyIds.push(id);
      }
    },
    addProperty: (state, action: PayloadAction<Property>) => {
      state.properties.unshift(action.payload);
    },
    updatePropertyStatus: (
      state,
      action: PayloadAction<{ id: string; status: Property['status'] }>
    ) => {
      const prop = state.properties.find((p) => p.id === action.payload.id);
      if (prop) {
        prop.status = action.payload.status;
      }
    },
    deleteProperty: (state, action: PayloadAction<string>) => {
      state.properties = state.properties.filter((p) => p.id !== action.payload);
      state.savedPropertyIds = state.savedPropertyIds.filter((id) => id !== action.payload);
    },
    setSelectedProperty: (state, action: PayloadAction<Property | null>) => {
      state.selectedProperty = action.payload;
    },
  },
});

export const {
  setFilter,
  resetFilters,
  toggleSaveProperty,
  addProperty,
  updatePropertyStatus,
  deleteProperty,
  setSelectedProperty,
} = propertySlice.actions;

export default propertySlice.reducer;
