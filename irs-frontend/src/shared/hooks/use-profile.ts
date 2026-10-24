import { useEffect, useState } from "react";
import { authClient } from "@/shared/lib/auth-client";
import {
	FALLBACK_NAV,
	NAV_BY_ROLE,
	type NavConfig,
	type RoleName,
} from "@/shared/model/nav-config";

type Profile = {
	roleName: RoleName;
	emailVerified: boolean;
	createdAt: string;
};

const getProfile = async (): Promise<Profile> => {
	const res = await authClient.$fetch("/get-profile");
	return res.data as Profile;
};

export function useProfile(isOnboardingComplete: boolean): {
	profile: Profile | null;
	nav: NavConfig;
} {
	const [profile, setProfile] = useState<Profile | null>(null);

	useEffect(() => {
		let cancelled = false;

		getProfile()
			.then((data) => {
				if (!cancelled) setProfile(data);
			})
			.catch((err) => {
				console.error("Failed to fetch profile:", err);
			});

		return () => {
			cancelled = true;
		};
	}, []);

	const nav: NavConfig = !isOnboardingComplete
		? NAV_BY_ROLE.guest
		: profile && NAV_BY_ROLE[profile.roleName]
			? NAV_BY_ROLE[profile.roleName]
			: FALLBACK_NAV;

	return { profile, nav };
}
