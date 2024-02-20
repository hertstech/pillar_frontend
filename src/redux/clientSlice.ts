import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Client {
  [x: string]: any;
  //   id: string;
  //   email: string;
  //   phoneNumber: string;
  //   address: string;
  //   lga: string;
  //   dateOfBirth: Date;
  //   height: number;
  //   weight: number;
  //   HMOPlan: string;
  //   firstName: string;
  //   middleName: string;
  //   lastName: string;
  //   state: string;
  //   gender: string;
  //   religion: string;
  //   tribalMarks: string;
  //   parentOne: string;
  //   parentOneNumber: string;
  //   parentOneNHR_ID: string;
  //   parentOneRelationship: string;
  //   parentTwo: string;
  //   parentTwoNumber: string;
  //   parentTwoNHR_ID: string;
  //   parentTwoRelationship: string;
  //   nominatedPharmarcy: string;
  //   registeredDoctor: string;
  //   nokFullName: string;
  //   nokNHR_ID: string;
  //   nokPhoneNumber: string;
  //   nokRelationship: string;
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
