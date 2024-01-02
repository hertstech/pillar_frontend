import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  // other fields...
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
      // state.client = { ...state.client, ...action.payload };
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

// state.client = action.payload.client;
// state.clientId = action.payload.client.id;
//   const { clientId, updatedClient } = action.payload;
//   const index = state.client.findIndex(
//     (client): any => clientId === clientId
//   );
//   if (index !== -1) {
//     state.client[index] = updatedClient;
//   }

// const { clientId, clientDetails } = action.payload;
// // Assuming state.client is an object, you can update it like this
// state.client = { clientId, ...clientDetails };
