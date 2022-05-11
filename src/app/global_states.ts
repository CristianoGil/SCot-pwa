import { createGlobalState } from "react-hooks-global-state";

export const { useGlobalState, getGlobalState, setGlobalState } = createGlobalState({ showModal: false });

