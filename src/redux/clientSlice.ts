import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Client {
  [x: string]: any;
}

interface ClientState {
  clients: Record<string, Client>;
}

export const clientSlice = createSlice({
  name: "client",
  initialState: {
    clients: {},
  } as ClientState,
  reducers: {
    dispatchClient: (
      state,
      action: PayloadAction<{ tabId: string; client: Client }>
    ) => {
      const { tabId, client } = action.payload;
      state.clients = {
        ...state.clients,
        [tabId]: client,
      };
    },
    dispatchEditClient: (
      state,
      action: PayloadAction<{ tabId: string; updatedClient: Client }>
    ) => {
      const { tabId, updatedClient } = action.payload;

      state.clients = {
        ...state.clients,
        [tabId]: updatedClient,
      };
    },
    resetClientState: (state, action: PayloadAction<string>) => {
      const tabIdToRemove = action.payload;
      const { [tabIdToRemove]: _, ...newClients } = state.clients;
      state.clients = newClients;
    },
  },
});

export const { dispatchClient, dispatchEditClient, resetClientState } =
  clientSlice.actions;

export default clientSlice.reducer;
