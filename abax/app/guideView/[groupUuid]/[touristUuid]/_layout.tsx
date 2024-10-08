import { BackButton } from "@/components/BackButton";
import { SignOutBtn } from "@/components/SignOutBtn";
import { GuideGroupsProvider } from "@/context/GuideGroupsContext";
import { GuideTouristsProvider } from "@/context/GuideTouristsContext";
import { Slot, Stack, useLocalSearchParams } from "expo-router";

export default function GuideViewLayout() {
    const { groupUuid } = useLocalSearchParams();

    // Ensure groupUuid is a string
    const groupUuidString = Array.isArray(groupUuid) ? groupUuid[0] : groupUuid;

    // Handle the case where groupUuid is undefined
    if (!groupUuidString) {
        return null; // or handle the error appropriately
    }

    return (
            <Slot />
    )
}
