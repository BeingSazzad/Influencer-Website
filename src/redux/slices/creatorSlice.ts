import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Creator, CreatorFilterState, CreatorPhoto, CreatorPackage, PortfolioItem } from '@/types';
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
    addCreatorPhoto: (state, action: PayloadAction<{ creatorId: string; photo: CreatorPhoto }>) => {
      const creator = state.creators.find((c) => c.id === action.payload.creatorId);
      if (creator) {
        if (!creator.photos) creator.photos = [];
        creator.photos.unshift(action.payload.photo);
      }
    },
    updateCreatorPhoto: (state, action: PayloadAction<{ creatorId: string; photo: CreatorPhoto }>) => {
      const creator = state.creators.find((c) => c.id === action.payload.creatorId);
      if (creator && creator.photos) {
        const index = creator.photos.findIndex((p) => p.id === action.payload.photo.id);
        if (index !== -1) {
          creator.photos[index] = action.payload.photo;
        }
      }
    },
    deleteCreatorPhoto: (state, action: PayloadAction<{ creatorId: string; photoId: string }>) => {
      const creator = state.creators.find((c) => c.id === action.payload.creatorId);
      if (creator && creator.photos) {
        creator.photos = creator.photos.filter((p) => p.id !== action.payload.photoId);
      }
    },
    updateCreatorProfileDetails: (state, action: PayloadAction<{ creatorId: string; updates: Partial<Creator> }>) => {
      const creator = state.creators.find((c) => c.id === action.payload.creatorId);
      if (creator) {
        Object.assign(creator, action.payload.updates);
      }
    },
    addCreatorPackage: (state, action: PayloadAction<{ creatorId: string; pkg: CreatorPackage }>) => {
      const creator = state.creators.find((c) => c.id === action.payload.creatorId);
      if (creator) {
        if (!creator.packages) creator.packages = [];
        creator.packages.unshift(action.payload.pkg);
      }
    },
    updateCreatorPackage: (state, action: PayloadAction<{ creatorId: string; pkg: CreatorPackage }>) => {
      const creator = state.creators.find((c) => c.id === action.payload.creatorId);
      if (creator && creator.packages) {
        const index = creator.packages.findIndex((p) => p.id === action.payload.pkg.id);
        if (index !== -1) {
          creator.packages[index] = action.payload.pkg;
        }
      }
    },
    deleteCreatorPackage: (state, action: PayloadAction<{ creatorId: string; packageId: string }>) => {
      const creator = state.creators.find((c) => c.id === action.payload.creatorId);
      if (creator && creator.packages) {
        creator.packages = creator.packages.filter((p) => p.id !== action.payload.packageId);
      }
    },
    addPortfolioItem: (state, action: PayloadAction<{ creatorId: string; item: PortfolioItem }>) => {
      const creator = state.creators.find((c) => c.id === action.payload.creatorId);
      if (creator) {
        if (!creator.portfolio) creator.portfolio = [];
        creator.portfolio.unshift(action.payload.item);
      }
    },
    updatePortfolioItem: (state, action: PayloadAction<{ creatorId: string; item: PortfolioItem }>) => {
      const creator = state.creators.find((c) => c.id === action.payload.creatorId);
      if (creator && creator.portfolio) {
        const index = creator.portfolio.findIndex((i) => i.id === action.payload.item.id);
        if (index !== -1) {
          creator.portfolio[index] = action.payload.item;
        }
      }
    },
    deletePortfolioItem: (state, action: PayloadAction<{ creatorId: string; itemId: string }>) => {
      const creator = state.creators.find((c) => c.id === action.payload.creatorId);
      if (creator && creator.portfolio) {
        creator.portfolio = creator.portfolio.filter((i) => i.id !== action.payload.itemId);
      }
    },
  },
});

export const {
  setFilter,
  resetFilters,
  toggleSaveCreator,
  setSelectedCreator,
  addCreatorPhoto,
  updateCreatorPhoto,
  deleteCreatorPhoto,
  updateCreatorProfileDetails,
  addCreatorPackage,
  updateCreatorPackage,
  deleteCreatorPackage,
  addPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
} = creatorSlice.actions;

export default creatorSlice.reducer;

