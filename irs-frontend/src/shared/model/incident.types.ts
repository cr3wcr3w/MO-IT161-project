export type statusesNameEnumType =
	| "submitted"
	| "under_review"
	| "invalid"
	| "duplicate"
	| "out_of_scope"
	| "in_progress"
	| "resolved"
	| "closed";

export type statusesType = {
	id: number;
	name: statusesNameEnumType;
	description: Text;
	createdAt: Date;
};

export type severityEnumType = "low" | "medium" | "high" | "critical";

export type reportsType = {
	id: Text;
	title: Text;
	bounty: number;
	severity: severityEnumType;
	reportBy: Text;
	statusId: number;
	createdAt: Date;
	updatedAt: Date;
	deleteAt: Date;
};

export type timelineType = {
	id: Text;
	reportId: Text;
	message: Text;
	updatedAt: Date;
	deleteAt: Date;
};
