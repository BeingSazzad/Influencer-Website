import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Creator, CreatorFilterState } from '@/types';
import { MOCK_CREATORS } from '@/Mockdata';

interface CreatorState {
  creators: Creator[];
  savedCreatorIds: string[];
  filters: CreatorFilterState;
  selectedCreator: Creator | null;
}

const initialFilters: CreatorFilterState = {
  searchQuery: '',
  category: 'all',
  platform: 'all',
  location: 'all',
  minPrice: 0,
  maxPrice: 5000,
  followerRange: 'all',
  sortBy: 'relevance',
};

const initialState: CreatorState = {
  creators: MOCK_CREATORS,
  savedCreatorIds: ['creator-01', 'creator-03'],
  filters: initialFilters,
  selectedCreator: null,
};

export const creatorSlice = createSlice({
  name: 'creator',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<CreatorFilterState>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialFilters;
    },
    toggleSaveCreator: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.savedCreatorIds.includes(id)) {
        state.savedCreatorIds = state.savedCreatorIds.filter((cId) => cId !== id);
      } else {
        state.savedCreatorIds.push(id);
      }
    },
    setSelectedCreator: (state, action: PayloadAction<Creator | null>) => {
      state.selectedCreator = action.payload;
    },
  },
});

export const { setFilter, resetFilters, toggleSaveCreator, setSelectedCreator } =
  creatorSlice.actions;

export default creatorSlice.reducer;
