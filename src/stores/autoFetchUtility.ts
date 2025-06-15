import { utilityId } from "@/enums";

//Stores
import { useUtilityStore } from "@/stores/utilityStore";

//Fetch Utility
useUtilityStore.getState().fetchUtility(utilityId);
