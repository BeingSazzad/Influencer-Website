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
  gender: 'all',
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
      if (state.selectedCreator && state.selectedCreator.id === action.payload.creatorId) {
        if (!state.selectedCreator.photos) state.selectedCreator.photos = [];
        state.selectedCreator.photos.unshift(action.payload.photo);
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
      if (state.selectedCreator && state.selectedCreator.id === action.payload.creatorId && state.selectedCreator.photos) {
        const index = state.selectedCreator.photos.findIndex((p) => p.id === action.payload.photo.id);
        if (index !== -1) {
          state.selectedCreator.photos[index] = action.payload.photo;
        }
      }
    },
    deleteCreatorPhoto: (state, action: PayloadAction<{ creatorId: string; photoId: string }>) => {
      const creator = state.creators.find((c) => c.id === action.payload.creatorId);
      if (creator && creator.photos) {
        creator.photos = creator.photos.filter((p) => p.id !== action.payload.photoId);
      }
      if (state.selectedCreator && state.selectedCreator.id === action.payload.creatorId && state.selectedCreator.photos) {
        state.selectedCreator.photos = state.selectedCreator.photos.filter((p) => p.id !== action.payload.photoId);
      }
    },
    updateCreatorProfileDetails: (state, action: PayloadAction<{ creatorId: string; updates: Partial<Creator> }>) => {
      const creator = state.creators.find((c) => c.id === action.payload.creatorId);
      if (creator) {
        Object.assign(creator, action.payload.updates);
      }
      if (state.selectedCreator && state.selectedCreator.id === action.payload.creatorId) {
        Object.assign(state.selectedCreator, action.payload.updates);
      }
    },
    addCreatorPackage: (state, action: PayloadAction<{ creatorId: string; pkg: CreatorPackage }>) => {
      const creator = state.creators.find((c) => c.id === action.payload.creatorId);
      if (creator) {
        if (!creator.packages) creator.packages = [];
        creator.packages.unshift(action.payload.pkg);
      }
      if (state.selectedCreator && state.selectedCreator.id === action.payload.creatorId) {
        if (!state.selectedCreator.packages) state.selectedCreator.packages = [];
        state.selectedCreator.packages.unshift(action.payload.pkg);
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
      if (state.selectedCreator && state.selectedCreator.id === action.payload.creatorId && state.selectedCreator.packages) {
        const index = state.selectedCreator.packages.findIndex((p) => p.id === action.payload.pkg.id);
        if (index !== -1) {
          state.selectedCreator.packages[index] = action.payload.pkg;
        }
      }
    },
    deleteCreatorPackage: (state, action: PayloadAction<{ creatorId: string; packageId: string }>) => {
      const creator = state.creators.find((c) => c.id === action.payload.creatorId);
      if (creator && creator.packages) {
        creator.packages = creator.packages.filter((p) => p.id !== action.payload.packageId);
      }
      if (state.selectedCreator && state.selectedCreator.id === action.payload.creatorId && state.selectedCreator.packages) {
        state.selectedCreator.packages = state.selectedCreator.packages.filter((p) => p.id !== action.payload.packageId);
      }
    },
    addPortfolioItem: (state, action: PayloadAction<{ creatorId: string; item: PortfolioItem }>) => {
      const creator = state.creators.find((c) => c.id === action.payload.creatorId);
      if (creator) {
        if (!creator.portfolio) creator.portfolio = [];
        creator.portfolio.unshift(action.payload.item);
      }
      if (state.selectedCreator && state.selectedCreator.id === action.payload.creatorId) {
        if (!state.selectedCreator.portfolio) state.selectedCreator.portfolio = [];
        state.selectedCreator.portfolio.unshift(action.payload.item);
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
      if (state.selectedCreator && state.selectedCreator.id === action.payload.creatorId && state.selectedCreator.portfolio) {
        const index = state.selectedCreator.portfolio.findIndex((i) => i.id === action.payload.item.id);
        if (index !== -1) {
          state.selectedCreator.portfolio[index] = action.payload.item;
        }
      }
    },
    deletePortfolioItem: (state, action: PayloadAction<{ creatorId: string; itemId: string }>) => {
      const creator = state.creators.find((c) => c.id === action.payload.creatorId);
      if (creator && creator.portfolio) {
        creator.portfolio = creator.portfolio.filter((i) => i.id !== action.payload.itemId);
      }
      if (state.selectedCreator && state.selectedCreator.id === action.payload.creatorId && state.selectedCreator.portfolio) {
        state.selectedCreator.portfolio = state.selectedCreator.portfolio.filter((i) => i.id !== action.payload.itemId);
      }
    },
    onboardCreator: (state, action: PayloadAction<Creator>) => {
      const existingIdx = state.creators.findIndex(
        (c) => c.id === action.payload.id || c.handle.toLowerCase() === action.payload.handle.toLowerCase()
      );
      if (existingIdx !== -1) {
        state.creators[existingIdx] = { ...state.creators[existingIdx], ...action.payload };
      } else {
        state.creators.unshift(action.payload);
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
  onboardCreator,
} = creatorSlice.actions;

export default creatorSlice.reducer;

