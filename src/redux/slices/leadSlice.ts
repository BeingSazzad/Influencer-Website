import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Lead, LeadStatus } from '@/types';
import { MOCK_LEADS } from '@/Mockdata';

interface LeadState {
  leads: Lead[];
  filterStatus: LeadStatus | 'all';
}

const initialState: LeadState = {
  leads: MOCK_LEADS,
  filterStatus: 'all',
};

export const leadSlice = createSlice({
  name: 'lead',
  initialState,
  reducers: {
    addLead: (state, action: PayloadAction<Lead>) => {
      state.leads.unshift(action.payload);
    },
    updateLeadStatus: (
      state,
      action: PayloadAction<{ id: string; status: LeadStatus }>
    ) => {
      const lead = state.leads.find((l) => l.id === action.payload.id);
      if (lead) {
        lead.status = action.payload.status;
      }
    },
    setLeadFilterStatus: (state, action: PayloadAction<LeadStatus | 'all'>) => {
      state.filterStatus = action.payload;
    },
    deleteLead: (state, action: PayloadAction<string>) => {
      state.leads = state.leads.filter((l) => l.id !== action.payload);
    },
  },
});

export const { addLead, updateLeadStatus, setLeadFilterStatus, deleteLead } =
  leadSlice.actions;

export default leadSlice.reducer;
